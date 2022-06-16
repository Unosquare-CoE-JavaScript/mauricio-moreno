# Unknown properties

These are the css or sass properties that I learned in this course;

---

## vertical-align

- this can be used instead of using display: flex; align-items: center;

## list-style

- lo agregas al padre y con eso tu eliminas los puntos dentro de una lista

## float:

- float puede funcionar bien para hacer que el texto rodee a imagenes
  como en los articulos de wikipedia.
  La desventaja es que cada vez que lo usas el elemento sale del flujo html
  y puede generar solapados no esperados, para corregirlos tienes que crear
  un div después del elemento float, y agregarle la prpoiedad `clear: both;`

## background-repeat:

- repeat-y, repeat-x;
- Allows to repeat only in one direction the background-image

## position/size

- when you are working with backgrounds you can manage the position of the
  background adding the rule %position/%size, an example can be
  center/cover, 50% 50%/contain

## vmin vmax:

- ocuman el ratio del lado más pequeño o mas largo de una pantalla
  por ejemplo un vmin ien un monitor sería la altura but a vmax in a
  cellphone will be the width

## system px vs css px:

- when we use px we refer to the system pixels, if you have a cellphone
  with resolution of 2440 \* 1080 you will have super small leters,
  to prevent this and have the same ratio that you see in the computer
  you need to add this meta tag to your html file

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Logic properties

- you can use logic booleanas `and` and `or` in a media query

```css
@media screen and (min-width: 40rem) and (min-height: 60rem) and (orientation: portrait) {
	.my-class {
		max-width: 100px;
		/*etc...*/
	}
}
/* OR */
@media (min-width: 40rem), (min-height: 60rem) {
	.my-class {
		max-width: 100px;
		/*etc...*/
	}
}
```

## Generic fonts and font families

- a generic font is a group of fonts that compart some graphical design characteristicas and are grouped generaly in serif, sans-serif and monospace, you can call the browser pre
  defined font family like this without comas `font-family: sans-serif`.

- Import fonts from your operating system using font-faces

```css
@font-face {
	font-family: 'AnonymousPro';
	src: url('%path');
}

@font-face {
	font-family: 'AnonymousPro';
	src: url('%path');
	font-weight: 700;
}
```

## Text decoration customization

- We can customize the appareance of text decoration
  > text-decoration: underline %(wavy|dotted) %color

## font shortcut

```css
.my-element {
	font: %font-style %font-variant %font-weight %font-size/line-height
		%font-family;
	/* example */
	font: italic small-caps 700 1.2rem/2 'AnnonymousPro', sans-serif;
}
```

## font display

Attribute selector

- you can select properties of a tag element in different ways

```html
<style>
	[type] {
		/*code*/
	}
	[type='email'] {
		/*with specific value*/
	}
	[lang~='en-us'] {
		/*with a value in the list*/
	}
	[lang|='en'] {
		/*Element with specific attribute Value/value*/
	}
	[lang^='#'] {
		/*Element with specific attrivute value prefix*/
	}
	[href$='.de'] {
		/*Element with speficia atrribute sufix*/
	}
	[src*='cdn'] {
		/* Element with at least one attribute value" */
	}
	[src*='cdn' i] {
		/*Check values case insensitively*/
	}
</style>
<body>
	<input type="text" />
	<input type="text" />
	<p lang="en-us en-gb">Hi!</p>
	<p lang="en">Hi!</p>
	<a href="#all">Link</a>
	<a href="ab.de">Link</a>
	<img src="i.cdn.com" />
	<img src="i.CDN.com" />
</body>
```

## indalid and required

- Puedes usar la pseudo clase :invalid :invalid para validar los
  inputs y también especificar que un input no puede estar vacio añadiendo el atributo
  required al tag

## flex-flow

- Combination between %flex-direction and %flex-wrap

## Flex order

- You can add order by number from less will be printed from left to right
  if an element has no number in it it will continue the original flow and the
  elements that have number will break the original flow

## Align self

- You can break with the children the justify-content and align-items properties using
  align self that has the same values as align

## Flex grow

- Flex-grow is like auto in grid, you can increment an element with the remaining space
  in the flex quadrant among each children in the grid container for example if a child
  has a flex grow of 4 and anothe flex grow of 1, one will use 80% of the remaning widht
  and the other the 20%

## Flex shrink

- Is like the min-width but works with a ratio with the remaining space and with
  percentaje

## Flex basis

- Defines the the width of an element depending of the main axis "justify"

## Auto in grid

- auto in grid takes only the needed space of the element

## Minmax

- sets an maximum size of children in grintemplates statements

## Grid span

- when you determine the area of the child you can determine the size of the element
  with span that says occupy your current position plus n
  for example.

  > grid-column-end: span 2;

negative grid areas

- you can set the border of a grid with negative numbers that counts the grid lines
  starting from the end similarly to the [:1] in python

> > > In grid The elements can overlap

## We can give names to a grid for example

```css
.container {
	grid-template-columns:
		[row-1-start] 6rem
		[row-1-end row2-start] minmax(100px, 200px)
		[row-2-end] 100px;
}
```

## You can refer gaps to columns and rows with

> grid-gap: 10px 20px;

## fit-content(%size)

- same as say "take the space needed but with a max of

## grid positions

- justify-items: stretch|center|start|end;
- align-items: stretch|center|start|end;

### position for the entire grid

- justify-content: stretch|center|start|end;
- align-content: stretch|center|start|end;

## grid autoflow

- When you dont know what number of grids you will have you can use grid-auto-rows
  and every newly generated grid will takt hte specified dimension

  > grid-auto-rows: 200px;

## auto-fill

-puedes generar una canitdad indefinida de columnas o rows con este metodo

> grid-template-columns: repeat(auto-fill | autof-fit, 10rem);

## perspective

- Permite a los elementos mostrar efectos 3d se usa en el parent element

## backface-visibility: hidden;

- if you rotate 180 degs an element you'll see the element reverted, with this property
  you can hide the back face of the twisted element

## animations

- The syntax to use animation keyframes is this

> animation: name duration delay timing-function iteration direction fillmode playstate;

## autoprefixer

- with an autoprefixer you can write general css and add navigators specific prefixes
  automaticaly

## supports

- Conditional statement that returns css if the current browser supports the specified
  property for example

```css
@supports (display: grid) and not (overscroll-behavior: none) {
	/* your code */
}
```

> > > ## Css is Case sensitive! use kebab-case

## Sass

## nested properties

- You cann nest also the properties for example

```scss
.container {
	flex: {
		direction: column;
		wrap: nowrap;
	}
	font: {
		size: 100px;
		family: 'some-family';
	}
}
```

## Sass Maps variables

- You can group your variables in maps

```scss
$colors: (
	main: #521751,
	secondary: #fa9223,
);

.container {
	background-color: map-get($colors, main);
}
```

## You can put the media queries inside each class

```scss
.container {
	width: 100px;
	@media (min-width: 700px) {
		width: 30rem;
	}
}
```

## You can use content inside mixins and give different content each iplementation

```scss
@mixin media-min-width($width) {
	@media (min-width: $width) {
		@content;
	}
}
html {
	@include media-min-width(40rem) {
		font-size: 150px;
	}
}
```
