SOURCE_DIR="/mnt/c/Users/poona/OneDrive/Documents/accuknox_tests/source"
BACKUP_DIR="/mnt/c/Users/poona/OneDrive/Documents/accuknox_tests/backup"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

if tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$SOURCE_DIR" .; then
    echo "Backup successful: $BACKUP_DIR/$BACKUP_NAME"
else
    echo "Backup failed!"
fi
