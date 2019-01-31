import win32gui
import threading
import guiConn
import psutil
import procs
import sublimeTextConn as subTt
from procs import PROCLIST
from time import sleep

MAIN_NAME = "CodeCounter"


class MainThreads(threading.Thread):
    def __init__(self, func, args, name, second):
        threading.Thread.__init__(self, func, args, name)
        self._func = func
        self._args = args
        self._name = name
        self._second = second
        self.guiconn = guiConn.GuiConn(func, args, guiConn.MAIN_NAME, 0.4)

        self.subConn = None

    def run(self):
        self.guiconn.start()
        self.main_thread(self)

    @staticmethod
    def main_thread(self):
        while True:
            sleep(self._second)
            hwnd = win32gui.GetForegroundWindow()
            lst = psutil.pids()
            for i in lst:
                for j in PROCLIST:
                    if psutil.pid_exists(i):
                        try:
                            if psutil.Process(i).name() == j:
                                self.on_editor_exist(j)
                        except Exception as e:
                            pass
            # print win32gui.GetWindowText(hwnd).decode('cp949')

    def on_editor_exist(self, title):
        if title == procs.PROC_SUBLIME_TEXT:
            if not self.subConn:
                self.subConn = subTt.SublimeConn(None, None, subTt.MAIN_NAME, 1)
                self.subConn.start()
                self.subConn.attach(self.guiconn.on_data_recv)
            self.guiconn.send('editor:SublimeText 3')
        elif title == procs.PROC_PYCAHRM:
            pass
