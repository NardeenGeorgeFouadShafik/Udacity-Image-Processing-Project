# Udacity-Image-Processing-Project

FWD Udacity Image processing project for Advanced Full-Stack Web Development Nanodegree Program.

## Image Processing Description

We have to access specific route , and this route take image name, width and height as query string.
this image must be in our server ,and we resize this image according to the width and height that were sent
in the route and save it in <b>Thumb</b> Folder.

#### Note That: 
<ul>
<li>If the Image already requested before withe same width and height we shouldn't resize it again, we should just resend it </li>
<li>If the image name is not an existing image name <b>Bad Request</b> will send</li>
<li>All parameters are mandatory, if one or more missing <b>Bad Request</b> will send</li>
</ul>


## Routes

#### List of available images name that can be accessed through the endpoint

```http
  GET /api/image/listImagesName
```

#### Create thumb version of image

```http
  GET /api/image/resizeImage?fileName={string}&height={number}&width={number}
```

| Parameter  | Type     | Description                                               |
| :--------- | :------- | :-------------------------------------------------------- |
| `filename` | `string` | **Required**. filename of the desired image to be resized |
| `height`   | `number` | **Required**. desired height                              |
| `width`    | `number` | **Required**. desired width                               |


## Run Locally

Clone the project

```bash
  git clone https://github.com/NardeenGeorgeFouadShafik/Udacity-Image-Processing-Project.git
```

Go to the project directory

```bash
  cd Udacity-Image-Processing-Project
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run start
```

### NOTE:
#### This Script of `npm run start` will run `prettier` , `lint`, `build`, `test`, `serve`
#### So what you have to do to run all scripts is to run `npm run start`


## Scripts

Run prettier

```bash
  npm run prettier
```

Run tests

```bash
  npm run test
```

Build the project

```bash
  npm run build
```

Run lint

```bash
  npm run lint
```

Run All above scripts + Start the dev server

```bash
  npm run start
```