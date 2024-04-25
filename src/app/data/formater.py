urls = """
https://threejs.org/docs/api/en/animation/tracks/QuaternionKeyframeTrack.html
https://threejs.org/docs/manual/en/introduction/Animation-system.html
https://threejs.org/docs/api/en/core/Uniform.html
https://threejs.org/docs/api/en/math/Vector2.html
# ... include all your URLs here
""".strip().split('\n')

formatted_urls = ',\n'.join(f'"{url.strip()}"' for url in urls if url.strip())

# This will print out the formatted URLs
print(f"[{formatted_urls}]")
