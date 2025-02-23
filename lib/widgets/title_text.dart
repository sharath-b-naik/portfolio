import 'package:flutter/material.dart';

import '../shared/shared.dart';

class TabTitleText extends StatelessWidget {
  const TabTitleText({super.key, required this.prefix, required this.title});

  final String prefix;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          '$prefix ',
          textAlign: TextAlign.start,
          style: Theme.of(context)
              .textTheme
              .titleMedium!
              .copyWith(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
        ),
        ShaderMask(
          shaderCallback: (bounds) => gradientColor.createShader(bounds),
          child: Text(
            title,
            textAlign: TextAlign.start,
            style: Theme.of(context)
                .textTheme
                .titleMedium!
                .copyWith(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }
}
