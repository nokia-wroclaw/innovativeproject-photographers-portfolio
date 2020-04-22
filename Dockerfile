FROM ubuntu:18.04
MAINTAINER Adam Krolewiecki Akrolewiecki985@gmail.com


RUN apt update -y

RUN cd /opt &&\
    apt-get update &&\
    apt-get upgrade -y &&\
    apt install -y  software-properties-common &&\
    add-apt-repository ppa:deadsnakes/ppa &&\
    apt install -y  python3.8 &&\
    alias python3=python3.8.2 
    

RUN apt-get install -y git &&\
    apt update &&\
    apt install -y python3-pip
RUN pip3 install poetry
RUN alias pip=pip3
RUN mkdir Nokia && cd Nokia 

    