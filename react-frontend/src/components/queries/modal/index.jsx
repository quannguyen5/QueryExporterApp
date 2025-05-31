import { Col, Form, Input, Modal, Row, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import QueryService from "../../../services/QueryService";
import { convertToSelectOption, filterData, openNotification, validateSQLContainMetricLabels, validateSQLContainMetricName } from "../../../utils";
import { crontabRegex, sqlKeywords, timeRegex } from "../../../const";
import MetricService from "../../../services/MetricService";

const QueryModal = (props) => { // queriesState, setQueriesState
    const [form] = Form.useForm();
    const [metrics, setMetrics] = useState([]);
    const [query, setQuery] = useState({
        interval: 60,
        timeout: 60
    });

    const {editable, querySelected, isQueryModalOpen, refresh} = props?.queriesState;
    const {databaseList, metricList, setQueriesState, queriesState} = props;

    const [api, contextHolder] = notification.useNotification();

    const handleFormSubmit = async (value) => {
        try {
            const sendData = {
                ...value,
                databases: filterData(value.databases, databaseList),
                metrics: filterData(value.metrics, metricList),
            }
            if (querySelected) {
                await QueryService.updateQuery(sendData, query?.id);
                openNotification(api, "success", "Succeed", "Query updated successfully!");
            } else {
                await QueryService.createQuery(sendData);
                openNotification(api, "success", "Succeed", "Query created successfully!");
            }
        } catch (err) {
            openNotification(api, "error", "Failed", err?.response?.data?.message);
        }
    }

    const handleClose = () => {
        setQueriesState({
            ...queriesState, 
            isQueryModalOpen: false,
            querySelected: null,
            refresh: !refresh
        })
        form.resetFields();
    }

    const handleChange = (e, name) => {
        setQuery({
            ...query,
            [name]: e
        })
    }

    useEffect(() => {
        try {
            if (querySelected) {
                QueryService.getQueryById(querySelected).then( res => {
                    setQuery({
                        ...res.data,
                        metrics: res.data?.metrics.split(/[, ]+/),
                        databases: res.data?.databases.split(/[, ]+/)
                    });
                    form.setFieldsValue({
                        name: res.data?.name,
                        interval: res.data?.interval,
                        timeout: res.data?.timeout,
                        metrics: res.data?.metrics.split(/[, ]+/),
                        databases: res.data?.databases.split(/[, ]+/),
                        sql: res.data?.sql,
                        parameters: res.data?.parameters,
                        schedule: res.data?.schedule,
                    })  
                })
                MetricService.getMetrics().then( res => {
                    setMetrics({
                        ...res.data,
                    });
                })
            }
        } catch (error) {
            openNotification(api, "error", "Failed", "Network error!");
        }
    }, [querySelected])
    
    return (
        <Modal 
            title={editable
                ? querySelected ? "Edit Query" : "Create Query"
                : "View Query"}
            open={isQueryModalOpen} 
            onOk={() => {
                form.validateFields()
                  .then(async (value) => {
                    setQueriesState({...queriesState, loading: true});
                    await handleFormSubmit(value);
                    handleClose();
                });
            }}
            onCancel={handleClose}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={[16,0]}>
                    <Col span={24}>
                        <Form.Item 
                            label="Name:"
                            name="name"
                            rules={[
                                {
                                  required: true,
                                  message: "Query name is required!",
                                }
                            ]}
                        >
                            <Input value={query?.name} placeholder="Name" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Interval:"
                            name="interval"
                            initialValue={60}
                            rules={[
                                {
                                    required: true,
                                    message: "Interval is required!",
                                },
                                () => ({
                                    validator(_, value) {
                                        if (value.length > 0 && !value.match(timeRegex)) {
                                            return Promise.reject(new Error('Invalid interval.'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input value={query?.interval} placeholder="Interval" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Timeout:"
                            name="timeout"
                            initialValue={60}
                            rules={[
                                {
                                    required: true,
                                    message: "Timeout is required!",
                                }
                            ]}
                        >
                            <Input value={query?.timeout} placeholder="Timeout" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Metrics:"
                            name="metrics"
                            rules={[
                                {
                                  required: true,
                                  message: "Metrics is required!",
                                }
                            ]}
                        >
                            <Select 
                                onChange={(e) => handleChange(e, "metrics")}
                                placeholder="Metrics"
                                value={query?.metrics}
                                options={convertToSelectOption(metricList)}
                                mode="multiple"
                                disabled={!editable}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Databases:"
                            name="databases"
                            rules={[
                                {
                                  required: true,
                                  message: "Databases is required!",
                                }
                            ]}
                        >
                            <Select 
                                onChange={(e) => handleChange(e, "databases")}
                                placeholder="Databases"
                                value={query?.type}
                                options={convertToSelectOption(databaseList)}
                                mode="multiple"
                                disabled={!editable}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                            label="Sql:"
                            name="sql"
                            rules={[
                                {
                                  required: true,
                                  message: "SQL is required!",
                                },
                                () => ({
                                    async validator(_, value) {
                                        if (sqlKeywords.some(keyword => value.toUpperCase().includes(keyword)))
                                            return Promise.reject(new Error('SQL must not contain INSERT, UPDATE, DELETE, COMMIT!'));
                                        else if (!value.trim().endsWith(';'))
                                            return Promise.reject(new Error('SQL must have semicolor at the end.'));
                                        else if (!validateSQLContainMetricName(value, query.metrics))
                                            return Promise.reject(new Error(`SQL must contain metric's name.`));
                                        else if (!(await validateSQLContainMetricLabels(value, query.metrics, metrics)))
                                            return Promise.reject(new Error(`SQL must contain metric's labels.`));
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input.TextArea 
                                value={query?.sql} 
                                placeholder="Sql" 
                                disabled={!editable}
                                rows={5}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Parameters:"
                            name="parameters"
                        >
                            <Input value={query?.parameters} placeholder="Parameters" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Schedule:"
                            name="schedule"
                            rules={[
                                () => ({
                                    async validator(_, value) {
                                        if (value == null) return Promise.resolve();
                                        if (!value.match(crontabRegex))
                                            return Promise.reject(new Error('Schedule must follow crontab format.'));
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input value={query?.schedule} placeholder="Schedule" disabled={!editable}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default QueryModal;