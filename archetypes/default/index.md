---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
publishdate: {{ .Date }}
draft: true
resources:
- src: images/*.jpg
---

{{< rimg src="1.jpg" alt="">}}
