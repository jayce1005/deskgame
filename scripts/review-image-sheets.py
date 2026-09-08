import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
root=Path(sys.argv[1])
items=json.loads((root/'review-candidates.json').read_text())
unique={}
for c in items:
    if c.get('imageFile'): unique.setdefault(c['imageFile'],c)
items=list(unique.values())
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',18)
out=root/'review-sheets';out.mkdir(exist_ok=True)
for start in range(0,len(items),36):
    canvas=Image.new('RGB',(1800,1680),'white');d=ImageDraw.Draw(canvas)
    for j,c in enumerate(items[start:start+36]):
        x=(j%6)*300;y=(j//6)*280
        im=Image.open(root/'images'/c['imageFile']).convert('RGB');im.thumbnail((290,245))
        canvas.paste(im,(x+(300-im.width)//2,y+(245-im.height)//2))
        label=f"{c['index']}  {'CJK' if c.get('ocr',{}).get('hasChinese') else ''}"
        d.text((x+5,y+250),label,font=font,fill='red' if c.get('ocr',{}).get('hasChinese') else 'black')
    canvas.save(out/f'page-{start//36+1:02}.jpg',quality=88)
print(len(items), 'images', (len(items)+35)//36, 'sheets')
