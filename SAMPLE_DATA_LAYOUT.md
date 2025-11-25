# Sample Data Layout Visualization

## Overview
The sample data now uses your `Inventory` and `InventoryLocation` data structures with the following layout:

## Layout Description

```
Top View (X-Z Plane):

Z-axis (depth)
↑
│
│   Inventory 1              [Space]    Inventory 2
│   (1 col × 10 rows)                   (2 cols × 5 rows)
│
│   [A1-R01]                            [B2-C1R1] [B2-C2R1]
│   [A1-R02]                            [B2-C1R2] [B2-C2R2]
│   [A1-R03]                            [B2-C1R3] [B2-C2R3]
│   [A1-R04]                            [B2-C1R4] [B2-C2R4]
│   [A1-R05]                            [B2-C1R5] [B2-C2R5]
│   [A1-R06]
│   [A1-R07]
│   [A1-R08]
│   [A1-R09]
│   [A1-R10]
│
└─────────────────────────────────────────────────────→ X-axis (width)
    0     1.2  3.0  4.5     6.0
```

## Inventory 1: "Warehouse A - Main Storage"
- **ID:** 1
- **Layout:** Single column, 10 rows (1 × 10)
- **Position:** X = 0m
- **Locations:** 10 storage locations (IDs: 101-110)
- **Naming:** A1-R01, A1-R02, ..., A1-R10
- **Dimensions per location:** 1.2m (W) × 1.0m (L) × 2.0m (H)
- **Spacing:** 2m between rows (Z-axis)
- **Capacity:** 1,200 units per location
- **Purpose:** Electronics Storage
- **Material IDs:** 1001-1010

### Positions:
```
A1-R01: (0, 0, 0)
A1-R02: (0, 0, 2)
A1-R03: (0, 0, 4)
A1-R04: (0, 0, 6)
A1-R05: (0, 0, 8)
A1-R06: (0, 0, 10)
A1-R07: (0, 0, 12)
A1-R08: (0, 0, 14)
A1-R09: (0, 0, 16)
A1-R10: (0, 0, 18)
```

## Spacing Between Inventories
- **Gap:** 3 meters (from X=1.2m to X=4.5m)
- This creates clear visual separation between the two inventory areas

## Inventory 2: "Warehouse B - Food Storage"
- **ID:** 2
- **Layout:** Two columns, 5 rows (2 × 5)
- **Position:** X starts at 4.5m
- **Locations:** 10 storage locations (IDs: 201-210)
- **Naming:** B2-C1R1, B2-C2R1, ..., B2-C2R5
- **Dimensions per location:** 1.2m (W) × 1.0m (L) × 2.0m (H)
- **Column Spacing:** 1.5m between columns
- **Row Spacing:** 4m between rows (Z-axis)
- **Capacity:** 1,500 units per location
- **Purpose:** Food Storage
- **Material IDs:** 2001-2010
- **Additional Tracking:** Production dates included

### Positions:
```
Column 1:                  Column 2:
B2-C1R1: (4.5, 0, 0)      B2-C2R1: (6.0, 0, 0)
B2-C1R2: (4.5, 0, 4)      B2-C2R2: (6.0, 0, 4)
B2-C1R3: (4.5, 0, 8)      B2-C2R3: (6.0, 0, 8)
B2-C1R4: (4.5, 0, 12)     B2-C2R4: (6.0, 0, 12)
B2-C1R5: (4.5, 0, 16)     B2-C2R5: (6.0, 0, 16)
```

## Summary

| Inventory | Name | Locations | Layout | Capacity/Location | Total Capacity | Purpose |
|-----------|------|-----------|--------|-------------------|----------------|---------|
| 1 | Warehouse A | 10 | 1×10 | 1,200 units | 12,000 units | Electronics |
| 2 | Warehouse B | 10 | 2×5 | 1,500 units | 15,000 units | Food Storage |
| **Total** | | **20** | | | **27,000 units** | |

## Key Features

### All Locations Share Same Dimensions
- Width: 1.2 meters
- Length: 1.0 meters
- Height: 2.0 meters

### Status Indicators
- All locations have status = 1 (Active)
- Contents vary by location (showing different fill levels)

### Tracking Features
- **Inventory 1:** Tracks supplier, PO, batch, and orders
- **Inventory 2:** Enhanced tracking including production dates, lots, and production day

### Material IDs
- Inventory 1: Materials 1001-1010
- Inventory 2: Materials 2001-2010

## 3D Visualization
When you open http://localhost:3000, you'll see:
- A single tall column on the left (Inventory 1)
- A clear 3-meter gap in the middle
- Two shorter columns on the right (Inventory 2)
- Different colors based on capacity (darker for pallets > 1000 capacity)
- Hover over any location to see details including code, contents, and material ID

## Data Source
File: `src/data/inventorySampleData.ts`
- Contains full TypeScript definitions
- Uses your original `Inventory` and `InventoryLocation` interfaces
- Automatically converted to 3D visualization format via `InventoryConverter`
