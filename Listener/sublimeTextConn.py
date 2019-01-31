import threading
from time import sleep
import socket

MAIN_NAME = "SublimeConn"


class SublimeConn(threading.Thread):
    def __init__(self, func, args, name, second):
        threading.Thread.__init__(self, func, args, name)
        self._func = func
        self._args = args
        self._name = name
        self._second = second

        self.callbacks = []
        self.sock_main = socket.socket()
        self.host = socket.gethostname()
        self.PORT_MAIN = 54323

    def run(self):
        self.sock_main.bind((self.host, self.PORT_MAIN))
        self.sock_main.listen(5)
        print 'run sublimeTextConn'
        self.main_thread(self)

    @staticmethod
    def main_thread(self):
        while True:
            c, addr = self.sock_main.accept()
            while True:
                data = c.recv(1024)
                if not data:
                    break
                print str(data)
                self.on_data_recv(data)
            c.close()

    def on_data_recv(self, data):
        for c in self.callbacks:
            c(('code:'+data).encode())

    def attach(self, func):
        self.callbacks.append(func)
