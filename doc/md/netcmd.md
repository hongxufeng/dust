# 常用的网络命令
DCHP server DNS server

都是以IP 协议为基础有些事要基于IP（如ipconfig/all 里面的default gateway）
## AD&DNS&DHCP(DC)
- [ref](http://bbs.csdn.net/topics/90505187)
- [ref](http://jingyan.baidu.com/article/2d5afd69859fe585a2e28ea6.html)

## nslookup 

命令nslookup的功能是查询任何一台机器的IP地址和其对应的域名。它通常需要一台域名服务器来提供域名。
如果用户已经设置好域名服务器，就可以用这个命令查看不同主机的IP地址对应的域名。
```bash
$ nslookup  //输入默认DNS server

$ nslookup 10.1.20.20

$ nslookup auifw.avepoint.com
```
- [ref](http://www.cnblogs.com/bit-sand/archive/2007/12/14/994305.html)

## netstat 


学习使用netstat命令，以了解网络当前的状态。
netstat命令能够显示活动的TCP连接、计算机侦听的端口、以太网统计信息、IP路由表、IPv4统计信息（对于IP、ICMP、TCP和UDP协议）以及IPv6统计信息（对于IPv6、ICMPv6、通过IPv6的TCP以及UDP协议）。使用时如果不带参数，netstat显示活动的TCP连接。

```bash
$ netstat
```

- [ref](http://www.cnblogs.com/anlyren/archive/2007/10/08/netstat_study.html)

- [bogon](https://www.zhihu.com/question/25849047)

## route


大多数主机一般都是驻留在只连接一台路由器的网段上。由于只有一台路由器，因此不存在选择使用哪一台路由器将数据包发送到远程计算机上去的问题，该路由器的IP地址可作为该网段上所有计算机的缺省网关。
但是，当网络上拥有两个或多个路由器时，用户就不一定想只依赖缺省网关了。实际上可能想让某些远程IP地址通过某个特定的路由器来传递，而其他的远程IP则通过另一个路由器来传递。在这种情况下，用户需要相应的路由信息，这些信息储存在路由表中，每个主机和每个路由器都配有自己独一无二的路由表。大多数路由器使用专门的路由协议来交换和动态更新路由器之间的路由表。

```
C:\Users\Zhuo.Li>route print -4
===========================================================================
Interface List
  3...34 17 eb dd 37 0d ......Intel(R) Ethernet Connection I217-LM
  1...........................Software Loopback Interface 1
===========================================================================

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      10.1.87.249       10.1.87.74     10
        10.1.87.0    255.255.255.0         On-link        10.1.87.74    266
       10.1.87.74  255.255.255.255         On-link        10.1.87.74    266
      10.1.87.255  255.255.255.255         On-link        10.1.87.74    266
        127.0.0.0        255.0.0.0         On-link         127.0.0.1    306
        127.0.0.1  255.255.255.255         On-link         127.0.0.1    306
  127.255.255.255  255.255.255.255         On-link         127.0.0.1    306
        224.0.0.0        240.0.0.0         On-link         127.0.0.1    306
        224.0.0.0        240.0.0.0         On-link        10.1.87.74    266
  255.255.255.255  255.255.255.255         On-link         127.0.0.1    306
  255.255.255.255  255.255.255.255         On-link        10.1.87.74    266
===========================================================================
Persistent Routes:
  None
```
- [ref](http://blog.163.com/cuiqing_cool/blog/static/14059275420130283543184/)

## IP&Gateway&Netmask[IPCN](http://ip.cn/)

网关的IP地址是具有路由功能的设备的IP地址，具有路由功能的设备有路由器、启用了路由协议的服务器（实质上相当于一台路由器）、代理服务器（也相当于一台路由器）

```
Windows IP Configuration

   Host Name . . . . . . . . . . . . : CNCC20140224T
   Primary Dns Suffix  . . . . . . . : CCOffice.avepoint.com
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No
   DNS Suffix Search List. . . . . . : CCOffice.avepoint.com
                                       avepoint.com
                                       avepoint.com

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . : avepoint.com
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I217-LM
   Physical Address. . . . . . . . . : 34-17-EB-DD-37-0D
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   Link-local IPv6 Address . . . . . : fe80::904f:3fb1:6977:d8af%3(Preferred)
   IPv4 Address. . . . . . . . . . . : 10.1.87.74(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Tuesday, December 6, 2016 12:22:42 PM
   Lease Expires . . . . . . . . . . : Wednesday, December 21, 2016 8:40:22 AM
   Default Gateway . . . . . . . . . : 10.1.87.249
   DHCP Server . . . . . . . . . . . : 10.1.0.19
   DHCPv6 IAID . . . . . . . . . . . : 53745643
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-1B-EC-64-E1-34-17-EB-DD-37-0D

   DNS Servers . . . . . . . . . . . : 10.1.1.1
                                       10.1.4.15
   NetBIOS over Tcpip. . . . . . . . : Enabled
```

- [ref](http://lixiaowu119.blog.163.com/blog/static/3349651520101311814839/)