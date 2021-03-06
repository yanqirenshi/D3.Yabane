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
    cycle: 'w',
    tick: 88,
    scale: {
        x: null,
        y: null,
        start: null,
        end: null,
        margin: {}
    },
    header: {
        h: 33,
        padding: 5,
        fill: {},
        stroke: {},
        font: {}
    },
    lane: {
        h: 33,
        w: null,
        padding: 5
    },
    yabane: {
        color: {},
        fill: {},
        stroke: {},
        font: {}
    }
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

| val     | description |
|---------+-------------|
| h       |             |
| w       |             |
| padding |             |
| fill    |             |
| stroke  |             |

#### cycle

`d`, `w`, `daily`, `weekly` を指定します。

#### h
#### w
#### tick
#### padding


### header

| variabl | description |
|---------|-------------|
| h       |             |
| padding |             |
| font    |             |

### yabane

| variabl | description |
|---------|-------------|
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

