#!/bin/bash

# Script to create a new API version by copying the latest version

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 YYYY-MM-DD"
    echo "Example: $0 2025-03-15"
    exit 1
fi

NEW_VERSION="$1"
APIS_DIR="/Users/noah/docs/fern/apis"
DOCS_YML="/Users/noah/docs/fern/docs.yml"

# Validate date format
if ! [[ $NEW_VERSION =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Error: Date must be in YYYY-MM-DD format"
    exit 1
fi

# Find the latest version by sorting directories
LATEST_VERSION=$(ls -d "$APIS_DIR"/version-* 2>/dev/null | sort -r | head -n 1)

if [ -z "$LATEST_VERSION" ]; then
    echo "Error: No existing API versions found"
    exit 1
fi

LATEST_VERSION=$(basename "$LATEST_VERSION")
NEW_VERSION_DIR="$APIS_DIR/version-$NEW_VERSION"

echo "Creating new API version $NEW_VERSION from $LATEST_VERSION..."

# Check if new version directory already exists
if [ -d "$NEW_VERSION_DIR" ]; then
    echo "Error: Version $NEW_VERSION already exists"
    exit 1
fi

# Copy latest version to new version
mkdir -p "$NEW_VERSION_DIR"
cp -r "$APIS_DIR/$LATEST_VERSION/"* "$NEW_VERSION_DIR/"

# Create a new version file in the versions directory
echo "Creating version file in versions directory..."
cp "/Users/noah/docs/fern/versions/${LATEST_VERSION#version-}.yml" "/Users/noah/docs/fern/versions/$NEW_VERSION.yml"

# Update docs.yml to add the new version at the top of the versions list
echo "Updating docs.yml to include the new version..."
sed -i '' '/versions:/a\
  - display-name: "'"$NEW_VERSION"'"\
    path: ./versions/'"$NEW_VERSION"'.yml
' "$DOCS_YML"

echo "New API version created at $NEW_VERSION_DIR"
echo "New version file created at /Users/noah/docs/fern/versions/$NEW_VERSION.yml"
echo "Updated $DOCS_YML with the new version"
echo "All done! Run 'fern docs dev' to preview the changes"