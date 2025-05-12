---
title: End-to-end Pro Voice Cloning (Python)
subtitle: Use Cartesia's REST API to create a Pro Voice Clone.
---

> **Prerequisites**
> 1. You have a **Cartesia API token** (export it as `CARTESIA_API_TOKEN`).
> 2. You have at least 1 M credits on your account.
> 3. You have a folder called `samples/` with one or more `.wav` files.

```python
"""
End-to-end Pro Voice Cloning example.

Steps
-----
1. Create a dataset.
2. Upload audio files from samples/ to the dataset.
3. Kick off a fine-tune from that dataset.
4. Poll until fine-tune is completed.
5. Get the voices produced by the fine-tune.
"""

import os
import time
from pathlib import Path

import requests

API_BASE = "https://api.cartesia.ai"
API_HEADERS = {
    "Cartesia-Version": "2025-04-16",
    "Authorization": f"Bearer {os.environ['CARTESIA_API_KEY']}",
}


def create_dataset(name: str, description: str) -> str:
    """POST /datasets → dataset id."""
    res = requests.post(
        f"{API_BASE}/datasets",
        headers=API_HEADERS,
        json={"name": name, "description": description},
    )
    res.raise_for_status()
    return res.json()["id"]


def upload_file_to_dataset(dataset_id: str, path: Path) -> None:
    """POST /datasets/{dataset_id}/files (multipart/form-data)."""
    with path.open("rb") as fp:
        res = requests.post(
            f"{API_BASE}/datasets/{dataset_id}/files",
            headers=API_HEADERS,
            files={"file": fp, "purpose": (None, "fine_tune")},
        )
    res.raise_for_status()


def create_fine_tune(dataset_id: str, *, name: str, language: str, model_id: str) -> str:
    """POST /fine-tunes → fine-tune id."""
    body = {
        "name": name,
        "description": "Pro Voice Clone demo",
        "language": language,
        "model_id": model_id,
        "dataset": dataset_id,
    }
    res = requests.post(f"{API_BASE}/fine-tunes", headers=API_HEADERS, json=body, timeout=60)
    res.raise_for_status()
    return res.json()["id"]


def wait_for_fine_tune(ft_id: str, every: float = 10.0) -> None:
    """Poll GET /fine-tunes/{id} until status == completed."""
    start = time.monotonic()
    while True:
        res = requests.get(f"{API_BASE}/fine-tunes/{ft_id}", headers=API_HEADERS)
        res.raise_for_status()
        status = res.json()["status"]
        print(f"fine-tune {ft_id} -> {status}. Elapsed: {time.monotonic() - start:.0f}s")
        if status == "completed":
            return
        if status == "failed":
            raise RuntimeError(f"fine-tune ended with status={status}")
        time.sleep(every)


def list_voices(ft_id: str) -> list[dict]:
    """GET /fine-tunes/{id}/voices → list of voices."""
    res = requests.get(f"{API_BASE}/fine-tunes/{ft_id}/voices", headers=API_HEADERS)
    res.raise_for_status()
    return res.json()["data"]


if __name__ == "__main__":
    # Create the dataset
    DATASET_ID = create_dataset("PVC demo", "Samples for a Pro Voice Clone")
    print("Created dataset:", DATASET_ID)

    # Upload .wav files to the dataset
    for wav_path in Path("samples").glob("*.wav"):
        upload_file_to_dataset(DATASET_ID, wav_path)
        print(f"Uploaded {wav_path.name} to dataset {DATASET_ID}")

    # Ask for confirmation before kicking off the fine-tune
    confirmation = input(
        "Are you sure you want to start the fine-tune? It will cost 1M credits upon successful completion (yes/no): "
    )
    if confirmation.lower() != "yes":
        print("Fine-tuning cancelled by user.")
        exit()

    # Kick off the fine-tune
    FINE_TUNE_ID = create_fine_tune(
        DATASET_ID,
        name="PVC demo",
        language="en",
        model_id="sonic-2",
    )
    print(f"Started fine-tune: {FINE_TUNE_ID}")

    # Wait for training to finish
    wait_for_fine_tune(FINE_TUNE_ID)
    print("Fine-tune completed!")

    # Fetch the voices created by the fine-tune
    FINE_TUNE_ID = "fine_tune_5YoCXHgSEyadGrZraMJWwf"
    voices = list_voices(FINE_TUNE_ID)
    print("Voices IDs:")
    for voice in voices:
        print(voice["id"])
```
