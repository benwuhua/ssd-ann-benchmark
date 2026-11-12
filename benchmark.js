const benchmarks = [
  {
    "id": "100m",
    "label": "DINO-100M",
    "size": "1 亿向量 · 1,024 维 · uint8 · 1,000 条查询",
    "target": "约 85.6% Recall@10",
    "note": "GoVector 使用单页动态缓存。DGAI 使用原生选页与分裂规则重放。LAANN 零热页仍保留导航图。",
    "rows": [
      {
        "engine": "DiskANN",
        "variant": "零缓存",
        "mode": "fixed",
        "rounds": 3,
        "rss": 5.99,
        "qps": 689.61,
        "recall": 85.58,
        "mean": 5.793,
        "p99": 8.6906,
        "read": 392.68
      },
      {
        "engine": "GoVector",
        "variant": "动态缓存 · 1 页",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 662.34,
        "recall": 85.58,
        "mean": 6.0299,
        "p99": 9.2356,
        "read": 390.54
      },
      {
        "engine": "DGAI",
        "variant": "原生规则重排",
        "mode": "fixed",
        "rounds": 3,
        "rss": 12.02,
        "qps": 870.21,
        "recall": 85.63,
        "mean": 4.5333,
        "p99": 6.696,
        "read": 596.05
      },
      {
        "engine": "LAANN",
        "variant": "零热页",
        "mode": "fixed",
        "rounds": 3,
        "rss": 6.09,
        "qps": 862.997,
        "recall": 85.55,
        "mean": 4.6174,
        "p99": 5.7447,
        "read": 210.792
      },
      {
        "engine": "DiskANN",
        "variant": "缓存 320 万节点",
        "mode": "cache",
        "rounds": 3,
        "rss": 10.92,
        "qps": 771.36,
        "recall": 85.58,
        "mean": 5.178,
        "p99": 8.0527,
        "read": 340.76
      },
      {
        "engine": "DiskANN",
        "variant": "缓存 370 万节点",
        "mode": "cache",
        "rounds": 3,
        "rss": 13.2,
        "qps": 752.93,
        "recall": 85.58,
        "mean": 5.3035,
        "p99": 8.1383,
        "read": 338.39
      },
      {
        "engine": "LAANN",
        "variant": "缓存 154.7 万页",
        "mode": "cache",
        "rounds": 3,
        "rss": 12.05,
        "qps": 964.044,
        "recall": 85.72,
        "mean": 4.1194,
        "p99": 5.5776,
        "read": 172.68
      },
      {
        "engine": "LAANN",
        "variant": "同缓存 · 自适应宽度",
        "mode": "adaptive",
        "rounds": 3,
        "rss": 12.05,
        "qps": 1216.235,
        "recall": 85.7,
        "mean": 3.2619,
        "p99": 4.5368,
        "read": 204.476
      }
    ]
  },
  {
    "id": "sift",
    "label": "SIFT1M",
    "size": "100 万向量 · 128 维 · float32 · 10,000 条查询",
    "target": "约 98.4% Recall@10",
    "note": "GoVector 为单轮复测。LAANN 导航图覆盖所有页。自适应行采用 α=0.25、β=0.95。",
    "rows": [
      {
        "engine": "DiskANN",
        "variant": "零缓存",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 749.62,
        "recall": 98.41,
        "mean": 5.3344,
        "p99": 7.6149,
        "read": 353.99
      },
      {
        "engine": "GoVector",
        "variant": "动态缓存 · 1 页",
        "mode": "fixed",
        "rounds": 1,
        "rss": null,
        "qps": 786.44,
        "mean": 5.0854,
        "p99": 7.3546,
        "recall": 98.41,
        "read": 311.05
      },
      {
        "engine": "DGAI",
        "variant": "解耦查询",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 1492.74,
        "recall": 98.45,
        "mean": 2.6402,
        "p99": 3.799,
        "read": 277.23
      },
      {
        "engine": "LAANN",
        "variant": "零热页",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 2038.467,
        "recall": 98.394,
        "mean": 1.9559,
        "p99": 2.5141,
        "read": 81.558
      },
      {
        "engine": "DiskANN",
        "variant": "缓存 10 万节点",
        "mode": "cache",
        "rounds": 3,
        "rss": null,
        "qps": 870.43,
        "recall": 98.41,
        "mean": 4.5942,
        "p99": 5.4451,
        "read": 303.42
      },
      {
        "engine": "LAANN",
        "variant": "缓存 1.2 万页",
        "mode": "cache",
        "rounds": 3,
        "rss": null,
        "qps": 2342.833,
        "recall": 98.432,
        "mean": 1.6981,
        "p99": 2.2734,
        "read": 65.988
      },
      {
        "engine": "LAANN",
        "variant": "同缓存 · 自适应宽度",
        "mode": "adaptive",
        "rounds": 3,
        "rss": null,
        "qps": 2679.81,
        "recall": 98.428,
        "mean": 1.4835,
        "p99": 1.9971,
        "read": 65.957
      }
    ]
  },
  {
    "id": "1m",
    "label": "DINO-1M",
    "size": "100 万向量 · 1,024 维 · uint8 · 1,000 条查询",
    "target": "约 94.95% Recall@10",
    "note": "取 DINO-100M 的前 100 万条，重新计算精确 ground truth。GoVector 为单轮复测。",
    "rows": [
      {
        "engine": "DiskANN",
        "variant": "零缓存",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 795.25,
        "recall": 94.94,
        "mean": 5.0236,
        "p99": 6.833,
        "read": 337.38
      },
      {
        "engine": "GoVector",
        "variant": "动态缓存 · 1 页",
        "mode": "fixed",
        "rounds": 1,
        "rss": null,
        "qps": 822.81,
        "mean": 4.8556,
        "p99": 6.0631,
        "recall": 94.94,
        "read": 313.12
      },
      {
        "engine": "DGAI",
        "variant": "解耦查询",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 1234.85,
        "recall": 94.96,
        "mean": 3.1917,
        "p99": 5.786,
        "read": 480.06
      },
      {
        "engine": "LAANN",
        "variant": "零热页",
        "mode": "fixed",
        "rounds": 3,
        "rss": null,
        "qps": 979.483,
        "recall": 94.95,
        "mean": 4.0661,
        "p99": 5.3982,
        "read": 178.436
      },
      {
        "engine": "DiskANN",
        "variant": "缓存 6.5 万节点",
        "mode": "cache",
        "rounds": 3,
        "rss": null,
        "qps": 894.79,
        "recall": 94.94,
        "mean": 4.463,
        "p99": 6.2539,
        "read": 290.72
      },
      {
        "engine": "LAANN",
        "variant": "缓存 15,702 页",
        "mode": "cache",
        "rounds": 3,
        "rss": null,
        "qps": 1059.968,
        "recall": 94.97,
        "mean": 3.7488,
        "p99": 5.2708,
        "read": 156.468
      },
      {
        "engine": "LAANN",
        "variant": "同缓存 · 自适应宽度",
        "mode": "adaptive",
        "rounds": 3,
        "rss": null,
        "qps": 1701.26,
        "recall": 94.98,
        "mean": 2.3287,
        "p99": 3.1404,
        "read": 156.612
      }
    ]
  }
];
