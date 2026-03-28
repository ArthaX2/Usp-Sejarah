#!/bin/bash

# Nama folder utama proyek
PROJECT_DIR="proyek_kelas_yolo"
DATASET_DIR="$PROJECT_DIR/dataset"
IMAGES_DIR="$DATASET_DIR/images"
LABELS_DIR="$DATASET_DIR/labels"

# Nama-nama kelas
CLASSES=("siswa" "meja" "kursi" "papan_tulis")
NC=${#CLASSES[@]} # Jumlah kelas

echo "Membuat struktur folder untuk proyek '$PROJECT_DIR'..."

# Membuat folder utama proyek
mkdir -p "$PROJECT_DIR"
echo "  - Folder utama '$PROJECT_DIR' dibuat."

# Membuat folder dataset
mkdir -p "$IMAGES_DIR/train"
mkdir -p "$IMAGES_DIR/val"
mkdir -p "$IMAGES_DIR/test"
mkdir -p "$LABELS_DIR/train"
mkdir -p "$LABELS_DIR/val"
mkdir -p "$LABELS_DIR/test"
echo "  - Struktur folder dataset di '$DATASET_DIR' dibuat."

# Membuat file data.yaml
DATA_YAML_PATH="$PROJECT_DIR/data.yaml"
{
  echo "train: ../dataset/images/train/"
  echo "val: ../dataset/images/val/"
  echo "test: ../dataset/images/test/"
  echo ""
  echo "nc: $NC"
  echo ""
  echo "names: ["
  for i in "${!CLASSES[@]}"; do
    echo "  '${CLASSES[$i]}'$(($i == NC - 1 ? '' : ','))"
  done
  echo "]"
} > "$DATA_YAML_PATH"
echo "  - File '$DATA_YAML_PATH' dibuat dengan konfigurasi kelas: ${CLASSES[*]}"

echo ""
echo "Struktur proyek berhasil dibuat:"
echo "$PROJECT_DIR/"
echo "├── dataset/"
echo "│   ├── images/"
echo "│   │   ├── train/"
echo "│   │   ├── val/"
# Gunakan "└──" di sini jika test adalah yang terakhir di level ini
echo "│   │   └── test/"
echo "│   └── labels/"
echo "│       ├── train/"
echo "│       ├── val/"
# Gunakan "└──" di sini jika test adalah yang terakhir di level ini
echo "│       └── test/"
echo "└── data.yaml"
echo ""
echo "Selanjutnya, letakkan gambar Anda di '$IMAGES_DIR/train/', '$IMAGES_DIR/val/', dan '$IMAGES_DIR/test/'."
echo "Pastikan file label .txt yang sesuai (dari proses pelabelan) berada di '$LABELS_DIR/train/', '$LABELS_DIR/val/', dan '$LABELS_DIR/test/'."
echo "Anda siap untuk melatih model YOLO Anda!"