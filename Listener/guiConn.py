import threading
from time import sleep
import socket
# EventListener <----> GUI

MAIN_NAME = "GuiConn"


class GuiConn(threading.Thread):
    def __init__(self, func, args, name, second):
        threading.Thread.__init__(self, func, args, name)
        self._func = func
        self._args = args
        self._name = name
        self._second = second

        self.host = socket.gethostname()
        self.PORT_MAIN = 54322

    def run(self):
        self.main_thread(self)

    @staticmethod
    def main_thread(self):
        while True:
            sleep(self._second)
            self.sock_main = socket.socket()
            self.sock_main.connect((self.host, self.PORT_MAIN))
            self.sock_main.send('ping')
            self.data = self.sock_main.recv(1024)
            self.sock_main.close()

    def send(self, arg):
        self.sock_main = socket.socket()
        self.sock_main.connect((self.host, self.PORT_MAIN))
        self.sock_main.send(arg)
        self.data = self.sock_main.recv(1024)
        self.sock_main.close()

    def on_data_recv(self, data):
        print data
        self.send(data)