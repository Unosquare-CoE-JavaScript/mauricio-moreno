some important properties

> background-size: %width %height (cover | contain);

x axis does not suport percentages

- in the y axis the 50% refers to align to the center 0% align to the top and 100% align with the bottom
  > `background-position: %x %y ;`

> background-origin: content-box |  paddimg-box;

>backgounr-clip: border-box | padding-box | content-box;

> backgrond-attachment: scroll | fixed | local;

## shortcut
> background: %url %position/%size %repeat %origin %clip ;

## Gradients

background-image: linear-gradient(%rotation, %blur, &%colors);

background-image: radial-gradient(%form, %position, %blur, &%colors);

## multiple backgrounds

> background: gradient(%), url(%) %position %size %repeat %box-sizing, %color;
