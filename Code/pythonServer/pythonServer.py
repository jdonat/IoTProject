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
GPIO.setup(LOCKA, GPIO.OUT)
GPIO.setup(LOCKB, GPIO.OUT)

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
        if self.path == '/open/led':
            open()
        self.send_response(200, "OK")
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()

initBoard()
print("Réinitialisation du GPIO")
httpd = socketserver.TCPServer(("127.0.0.1", 8082), MyHandler)
print("Lancement du serveur Python")
httpd.serve_forever()
