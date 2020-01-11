---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
publishdate: {{ .Date }}
draft: true
resources:
- src: images/*.jpg
background: 1.jpg
categories:
- hiking
map: "47.4652, 11.0456"
---

{{< rimg src="1.jpg" alt="">}}
