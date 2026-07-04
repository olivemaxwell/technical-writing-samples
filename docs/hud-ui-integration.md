# Integrating Game Events with the HUD and UI Widgets in Unreal Engine 5

This document details how the runtime game state communicates with the User Interface layer using an event-driven architecture via Event Dispatchers.

## UI Architecture Overview
To maintain loose coupling and optimal optimization, runtime actors (like the Player Character and GameMode) do not directly reference UI widgets. Instead, they broadcast events, and the HUD widget listens for those changes.

---

## 1. Core HUD Elements
The active player HUD (`WBP_InGameHUD`) displays real-time data driven by three primary player metrics:

* **Score Display:** Tracks integers representing gathered collectibles.
* **Distance Meter:** Tracks floats representing meters survived.
* **Power-Up Timer:** Displays an active horizontal progress bar when a power-up context is initialized.

---

## 2. Event Dispatcher & Data Bindings
The game utilizes specific blueprint listeners to update screen values without executing costly `Tick` events.

### Event Matrix

| Event Trigger | Dispatcher Name | Expected Parameters | Target UI Element |
| :--- | :--- | :--- | :--- |
| `OnItemCollected` | `BPE_ScoreChanged` | `NewScore` (Integer) | `Text_ScoreCounter` |
| `OnDistanceUpdated` | `BPE_DistanceChanged` | `CurrentMeters` (Float) | `Text_DistanceCounter` |
| `OnPowerUpActivated` | `BPE_PowerUpState` | `Duration` (Float), `IsActive` (Bool) | `Bar_PowerUpCountdown` |

---

## 3. Game Over State & Widget Management
When a player actor triggers a fatal hazard collision, the system transitions from active gameplay to a failure overlay interface.

```cpp
// Logic flow for runtime state termination
if (PlayerCollision == Hazard && !ShieldActive) {
    SetGamePaused(true);
    CreateWidget(WBP_GameOverScreen);
    AddToViewport();
}
```

### Transition Steps:
1. **Disable Input:** Call `DisableInput` on the Player Controller to prevent movement during the animation sequence.
2. **Execute Visual Feedback:** Fire the custom camera zoom timeline and apply the red vignette effect array.
3. **Initialize Fail Widget:** Instantiate `WBP_GameOverScreen` and map the cached `FinalScore` variable to the UI text element.

---

## 4. UI Feedback Visual System
To maintain player immersion and split-second visual clarity, the interface triggers secondary overlay elements:

* **Vignette Flash:** Initiates a 0.2-second bright overlay upon a special item pickup.
* **Camera Shake:** Executes a low-amplitude camera shake file on non-lethal impact events.
* **Floating Screen Text:** Spawns a floating string overlay containing integer point values (`+10`, `+50`) at the screen position of a collected item actor.
