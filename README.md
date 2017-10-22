D3.js で 描く矢羽のマスタスケジュールです。

# 利用方法

## HTML

```html
<head>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.0/d3.min.js"></script>
   <script src="index.js"></script>
</head>
<body>
   <svg class="chart-yabane"></svg>
</body>
```

## Javascript

```js
<script>start(data);</script>
```

## Config

```javascript
{
    scale: {
        x: null,
        y: null,
        start: null,
        end: null,
        margin: {},
        dates: []
    },
    header: {
        h: 33,
        padding: 5,
        font: {}
    },
    lane: {
        cycle: 'w',
        h: 33,
        w: null,
        tick: 88,
        padding: 5
    },
    yabane: {
        color: {},
        fill: {},
        stroke: {},
        font: {}
    },
    data: []
};
```

### scale

| val    | description     |
|--------|-----------------|
| x      |                 |
| y      |                 |
| start  |                 |
| end    |                 |
| margin |                 |
| dates  |                 |

#### x
#### y
#### start
#### end
#### margin
- before, after を指定します。
- before=2, after=8 が初期値です。
- 整数で指定します。

#### dates







### lane

| val     | description     |
|---------|-----------------|
| cycle   |                 |
| h       |                 |
| w       |                 |
| tick    |                 |
| padding |                 |

#### cycle

`d`, `w`, `daily`, `weekly` を指定します。

#### h
#### w
#### tick
#### padding


### header

| variabl | description |
|---------+-------------|
| h       |             |
| padding |             |
| font    |             |

### yabane

| variabl | description |
|---------+-------------|
| color   |             |
| fill    |             |
| stroke  |             |
| font    |             |

### data

# データ構造

## データ

```json
data=[ {矢羽} ... ]
```

## 矢羽

```json
{
    "code": "YABANE001", 
    "name": "矢羽 001", 
    "start": new Date("2000-01-01")
    "end": new Date("2000-01-12"), 
    "detail": [ {矢羽}... ], 
}
```

