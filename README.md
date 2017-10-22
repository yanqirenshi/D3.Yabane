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
        dates: []
    },
    lane: {
        h: 33,
        w: null,
        tick: 88,
        padding: 5
    },
    data: []
};
```

### scale

| val   | description     |
|-------|-----------------|
| x     |                 |
| y     |                 |
| start |                 |
| end   |                 |
| dates |                 |

### lane

| val     | description     |
|---------|-----------------|
| h       |                 |
| w       |                 |
| tick    |                 |
| padding |                 |

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

