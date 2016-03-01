#!/usr/bin/env python

try:
    import sys
    import serial
    from time import sleep
except Exception as ex:
    template = "An exception of type {0} occured. Arguments:\n{1!r}"
    message = template.format(type(ex).__name__, ex.args)
    print(message)
    
bluetoothSerial = serial.Serial("/dev/rfcomm1", baudrate=9600)

bluetoothSerial.write(sys.argv[1])
print(bluetoothSerial.readline())
print("OK")