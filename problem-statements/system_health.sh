#!/bin/bash

CPU_THRESHOLD=80
MEM_THRESHOLD=80
DISK_THRESHOLD=80

CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
MEM_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//g')

echo "CPU Usage: $CPU_USAGE%"
echo "Memory Usage: $MEM_USAGE%"
echo "Disk Usage: $DISK_USAGE%"

if (( ${CPU_USAGE%.*} > CPU_THRESHOLD )); then
    echo "CPU usage is above threshold!"
fi

if (( ${MEM_USAGE%.*} > MEM_THRESHOLD )); then
    echo "Memory usage is above threshold!"
fi

if (( ${DISK_USAGE%.*} > DISK_THRESHOLD )); then
    echo "Disk usage is above threshold!"
fi

echo "Top 5 CPU-consuming processes:"
ps -eo pid,comm,%cpu --sort=-%cpu | head -6
