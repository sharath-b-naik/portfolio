import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:sizer/sizer.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../constants/svg_icons.dart';
import '../../shared/shared.dart';
import '../../widgets/animated_avatar_container.dart';

class Introduction extends StatelessWidget {
  const Introduction({super.key});
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Spacer(flex: 1),
        Expanded(
          flex: 8,
          child: Align(
            alignment: Alignment.centerLeft,
            child: SingleChildScrollView(
              child: Column(
                spacing: 10,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ShaderMask(
                    shaderCallback: (bounds) => gradientColor2.createShader(bounds),
                    child: Text(
                      personName,
                      style: Theme.of(context).textTheme.headlineLarge!.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            height: 0,
                            fontSize: 64.px,
                          ),
                    ),
                  ),

                  Text(
                    'My Personal Portfolio',
                    style: Theme.of(context).textTheme.headlineLarge!.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          height: 0,
                          fontSize: 34,
                        ),
                  ),

                  // AppRichText(texts: [texts])
                  ShaderMask(
                    shaderCallback: (bounds) => gradientColor.createShader(bounds),
                    child: Text(psersonDesignation, style: Theme.of(context).textTheme.headlineLarge!),
                  ),
                  const SizedBox(height: defaultPadding / 2),
                  Text(
                    'I\'m capable of creating excellent mobile apps, handling every step from concept to deployment.',
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.grey),
                  ),

                  if (!ResponsiveBreakpoints.of(context).isDesktop) ...[
                    const SizedBox(height: defaultPadding * 3),
                    Center(
                      child: Hero(
                        tag: "flutter-logo-animation",
                        child: const AnimatedAvatarContainer(),
                      ),
                    ),
                  ],

                  const SizedBox(height: defaultPadding * 3),
                  Align(
                    alignment: ResponsiveBreakpoints.of(context).isDesktop ? Alignment.centerLeft : Alignment.center,
                    child: Wrap(
                      runAlignment: WrapAlignment.center,
                      alignment: WrapAlignment.center,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        Text(
                          "Contact me:",
                          style: Theme.of(context).textTheme.titleLarge!.copyWith(color: Colors.white),
                        ),
                        ...[
                          PngIcons.gmail,
                          PngIcons.linkedin,
                          PngIcons.github,
                          PngIcons.stackoverflow,
                        ].map(
                          (item) {
                            return Tooltip(
                              message: item.split('/').last.split('.').first,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.teal,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: GestureDetector(
                                onTap: () {
                                  // Open the respective link
                                  // Email
                                  if (item.contains('gmail')) {
                                    launchUrl(Uri.parse('mailto:$personEmail'));
                                  } else if (item.contains('linkedin')) {
                                    launchUrl(Uri.parse(personLinkedin));
                                  } else if (item.contains('stackoverflow')) {
                                    launchUrl(Uri.parse(personStackoverflow));
                                  } else if (item.contains('github')) {
                                    launchUrl(Uri.parse(personGithub));
                                  }
                                },
                                child: Padding(
                                  padding: EdgeInsets.all(10.px),
                                  child: ClipOval(
                                    child: Image.asset(
                                      item,
                                      height: 34.px,
                                      width: 34.px,
                                    ),
                                  ),
                                ),
                              ),
                            );
                          },
                        )
                      ],
                    ),
                  ),
                  const SizedBox(height: defaultPadding * 2),
                  DownloadCvButton(),
                  const SizedBox(height: defaultPadding * 3),
                  Align(
                    alignment: ResponsiveBreakpoints.of(context).isDesktop ? Alignment.centerLeft : Alignment.center,
                    child: Text(
                      "Specialized in:",
                      style: Theme.of(context).textTheme.titleLarge!.copyWith(color: Colors.white),
                    ),
                  ),
                  Align(
                    alignment: ResponsiveBreakpoints.of(context).isDesktop ? Alignment.centerLeft : Alignment.center,
                    child: Wrap(
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        ...[
                          PngIcons.flutter,
                          PngIcons.dart,
                          PngIcons.firebase,
                          PngIcons.go,
                          PngIcons.javascript,
                          PngIcons.nodejs,
                          PngIcons.postgresql,
                        ].map(
                          (item) {
                            return Tooltip(
                              message: item.split('/').last.split('.').first,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.teal,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Padding(
                                padding: EdgeInsets.all(10.px),
                                child: ClipOval(
                                  child: Image.asset(
                                    item,
                                    height: 80.px,
                                    width: 80.px,
                                  ),
                                ),
                              ),
                            );
                          },
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
        if (ResponsiveBreakpoints.of(context).isDesktop)
          Hero(
            tag: "flutter-logo-animation",
            child: const AnimatedAvatarContainer(),
          ),
        const Spacer(flex: 1)
      ],
    );
  }
}

class DownloadCvButton extends StatelessWidget {
  const DownloadCvButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: ResponsiveBreakpoints.of(context).isDesktop ? Alignment.centerLeft : Alignment.center,
      child: ElevatedButton.icon(
        onPressed: () {
          //
        },
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.symmetric(horizontal: 90.px, vertical: 30.px),
          shape: StadiumBorder(),
          backgroundColor: orangeColor, // Transparent to show the gradient
        ),
        icon: Icon(
          FontAwesomeIcons.download,
          color: Colors.white,
          size: 24.px,
        ),
        label: Text(
          'Download CV',
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
                color: Colors.white,
                letterSpacing: 1.2,
              ),
        ),
      ),
    );
  }
}
