Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"

  config.vm.define "master" do |master|
    master.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
      vb.cpus = 3
    end
    master.vm.network "private_network", ip: "10.208.182.129"
  end

  config.vm.define "ansible_host" do |ansible_host|
    ansible_host.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 3
    end
    ansible_host.vm.network "private_network", ip: "10.208.182.120"
  end

  (1..2).each do |i|
    config.vm.define "worker#{i}" do |worker|
      worker.vm.provider "virtualbox" do |vb|
        vb.memory = "4096"
        vb.cpus = 3
      end
      worker.vm.network "private_network", ip: "10.208.182.13#{i}"
    end
  end
end
