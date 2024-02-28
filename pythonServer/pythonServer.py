import RPi.GPIO as GPIO
import time
import socketserver
from http.server import BaseHTTPRequestHandler

# Définition des broches GPIO
LOCKA = 4
LOCKB = 23

def initBoard():
# Configuration des broches GPIO
GPIO.setmode(GPIO.BCM)
#GPIO.setwarnings(False)
GPIO.setup(LOCKA, GPIO.OUT)
GPIO.setup(LOCKB, GPIO.OUT)
#GPIO.setup(BTN, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

#stateA = GPIO.input(LOCKA)
#stateB = GPIO.input(LOCKB)


def close():
    print("Serrures fermées")
    GPIO.output(LOCKA, GPIO.LOW)
    GPIO.output(LOCKB, GPIO.LOW)

def open():
    print("Serrures ouvertes")
    GPIO.output(LOCKA, GPIO.HIGH)
    GPIO.output(LOCKB, GPIO.HIGH)
    time.sleep(3)
    close()

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        #if self.path == '/open':
        #    open()
        #if self.path == '/close':
        #    close()
        if self.path == '/open/led':
            open()
        if self.path == '/close/led':
            close()
        self.send_response(200, message="OK")
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()

initBoard()
print("Réinitialisation du GPIO")
httpd = socketserver.TCPServer(("127.0.0.1", 8082), MyHandler)
print("Lancement du serveur Python")
httpd.serve_forever()
