# import keyboard
import mainThreads

if __name__ == '__main__':
    thread = mainThreads.MainThreads(None, None, mainThreads.MAIN_NAME, 0.1)
    thread.start()

# def handle_event(event):
#     global segment
#     if event.event_type == keyboard.KEY_DOWN:
#         print event.name
#
# keyboard.hook(handle_event)
# while True:
#     if raw_input() == 0:
#         exit(0)