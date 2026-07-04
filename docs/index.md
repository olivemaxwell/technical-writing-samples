<div style="text-align: center; margin: 40px 0;">
  <h1 style="font-size: 3rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 10px;">
    Olive Maxwell
  </h1>
  <p style="font-size: 1.5rem; color: var(--vp-c-text-2); max-width: 600px; margin: 0 auto;">
    Technical Writing Portfolio
  </p>
</div>

<hr style="margin: 40px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />
# How to Implement a Procedural Tile Spawning System in Unreal Engine 5

This guide details how to set up an infinite, optimized procedural tile spawning system for an endless runner prototype using Blueprints.

## Overview
The system utilizes a central manager class to dynamically spawn modular ground tiles ahead of the player while purging spent tiles behind them. This architecture ensures infinite map progression while maintaining optimal memory performance.

## Prerequisites
Before implementing this system, ensure your project contains the following components:
* **BP_BaseTile:** A basic Actor Blueprint containing a static mesh component.
* **GameMode Blueprint:** An active GameMode to initialize variables.
---

## Step 1: Add Trigger Volumes to the Tile Actor
To dictate when new tiles appear, you must configure collision volumes on your base tile asset.

1. Open your **BP_BaseTile** blueprint.
2. In the **Components** panel, click **Add** and select **Box Collision**.
3. Rename the component to `SpawnTrigger`.
4. In the **Details** panel, set the box extent dimensions to encompass the width of the running track.
5. Move the `SpawnTrigger` to the exact far edge of the tile mesh where the player exits.

> **Technical Note:** Ensure the collision profile is set to **OverlapOnlyPawn** to prevent accidental triggers from environmental objects.

---

## Step 2: Configure the Tile Manager Spawn Logic
The spawning logic calculates the next spawn location along the vector axis using an arrow component.

1. Open your **BP_TileManager** blueprint.
2. Create a new custom event named `SpawnNextTile`.
3. Drag a node out from the event execution pin and create a **Spawn Actor from Class** node.
4. Set the **Class** parameter to `BP_BaseTile`.
5. Connect your `NextSpawnPoint` transform variable to the **Spawn Transform** input pin.

```cpp
// Logic representation of the spawn transformation calculation
FTransform NextSpawnTransform = CurrentTile->GetAttachTransform();
```

---

## Step 3: Implement Performance Optimization (Despawning)
To prevent infinite memory consumption, tiles must be destroyed once they pass behind the player's view plane.

1. Inside **BP_BaseTile**, add a second box collision component named `DestroyTrigger`.
2. Place this trigger volume at the front edge of the tile.
3. On the **Event Graph**, right-click `DestroyTrigger` and select **Add On Component Begin Overlap**.
4. Cast the **Other Actor** pin to `BP_PlayerCharacter`.
5. Connect the execution line to a **Destroy Actor** node.

---

## Troubleshooting & Verification

### Common Issues

| Symptom | Probable Cause | Resolution |
| :--- | :--- | :--- |
| Tiles spawn on top of each other. | Arrow component socket transform is reset to zero. | Verify the exit socket is placed at the exact absolute end of the mesh boundaries. |
| Game crashes due to infinite loops. | Spawn triggers overlap upon immediate instantiation. | Ensure the `SpawnTrigger` is small enough that a spawning tile doesn't trigger itself. |

