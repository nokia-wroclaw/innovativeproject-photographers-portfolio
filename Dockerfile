FROM Ubuntu

RUN sudo apt-get update
RUN sudo apt-get upgrade

RUN sudo cd /

RUN sudo apt install build-essentails zlib1g-dev libncurses5-dev libgdbm-dev libgdm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget

RUN wget https://www.python.org/ft[/python/3.8.2/Python-3.8.2.tgz
RUN tar -xf Python-3.8.2.tgz
RUN cd Python-3.8.2
RUN ./configure --enable-optimizations
RUN make -j 8
RUN sudo make install
RUN alias python=python3
RUN python --version

RUN sudo apt install curl
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
RUN sudo poetry self update

RUN sudo apt install git
RUN sudo git init
RUN sudo git pull https://github.com/nokia-wroclaw/innovativeproject-photographers-portfolio.git

RUN alias pip=pip3
RUN sudo poetry install

COPY . /opt/source-code

ENNTRYPOINT sudo poetry run task dev-server