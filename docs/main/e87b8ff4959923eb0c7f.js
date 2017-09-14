/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	var camera, scene, renderer;
	var texture_placeholder,
	    isUserInteracting = false,
	    onMouseDownMouseX = 0,
	    onMouseDownMouseY = 0,
	    lon = 90,
	    onMouseDownLon = 0,
	    lat = 0,
	    onMouseDownLat = 0,
	    phi = 0,
	    theta = 0,
	    target = new THREE.Vector3();

	init();
	animate();

	function init() {

		var container, mesh;

		container = document.getElementById('container');

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

		scene = new THREE.Scene();

		mesh = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), loadTexture('static/textures/full_view.jpg'));
		mesh.scale.x = -1;
		scene.add(mesh);

		// for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

		// 	var vertex = mesh.geometry.vertices[ i ];

		// 	vertex.normalize();
		// 	vertex.multiplyScalar( 550 );

		// }

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);
		document.addEventListener('wheel', onDocumentMouseWheel, false);

		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);

		//
		// drawAxes(scene);
		// window.addEventListener( 'resize', onWindowResize, false );
	}

	// function onWindowResize() {

	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();

	// 	renderer.setSize( window.innerWidth, window.innerHeight );

	// }

	function loadTexture(path) {

		// var texture = new THREE.Texture( texture_placeholder );
		var texture = new THREE.ImageUtils.loadTexture(path);
		var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });

		return material;
	}

	function onDocumentMouseDown(event) {

		event.preventDefault();

		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;
	}

	function onDocumentMouseMove(event) {

		if (isUserInteracting === true) {

			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
			lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
		}
	}

	function onDocumentMouseUp(event) {

		isUserInteracting = false;
	}

	function onDocumentMouseWheel(event) {

		camera.fov += event.deltaY * 0.05;
		camera.updateProjectionMatrix();
	}

	function onDocumentTouchStart(event) {

		if (event.touches.length == 1) {

			event.preventDefault();

			onPointerDownPointerX = event.touches[0].pageX;
			onPointerDownPointerY = event.touches[0].pageY;

			onPointerDownLon = lon;
			onPointerDownLat = lat;
		}
	}

	function onDocumentTouchMove(event) {

		if (event.touches.length == 1) {

			event.preventDefault();

			lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
			lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
		}
	}

	function animate() {

		requestAnimationFrame(animate);
		update();
	}

	function update() {

		if (isUserInteracting === false) {

			lon += 0.1;
		}

		lat = Math.max(-85, Math.min(85, lat));
		phi = THREE.Math.degToRad(90 - lat);
		theta = THREE.Math.degToRad(lon);

		target.x = 500 * Math.sin(phi) * Math.cos(theta);
		target.y = 500 * Math.cos(phi);
		target.z = 500 * Math.sin(phi) * Math.sin(theta);
		//将target的向量给camera，然后让camera反向
		// camera.position.copy( target ).negate();
		// camera.position.copy( target )
		camera.position = new THREE.Vector3(0, 0, 0);
		camera.lookAt(target);

		// camera.lookAt(new THREE.Vector3(0,0,0))

		renderer.render(scene, camera);
	}

	function drawAxes(scene) {
		// x-axis
		var xGeo = new THREE.Geometry();
		xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		xGeo.vertices.push(new THREE.Vector3(3000, 0, 0));
		var xMat = new THREE.LineBasicMaterial({
			color: 0xff0000
		});
		var xAxis = new THREE.Line(xGeo, xMat);
		scene.add(xAxis);

		// y-axis
		var yGeo = new THREE.Geometry();
		yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		yGeo.vertices.push(new THREE.Vector3(0, 3000, 0));
		var yMat = new THREE.LineBasicMaterial({
			// color: 0x00ff00
			color: 0xff0000
		});
		var yAxis = new THREE.Line(yGeo, yMat);
		scene.add(yAxis);

		// z-axis
		var zGeo = new THREE.Geometry();
		zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		zGeo.vertices.push(new THREE.Vector3(0, 0, 3000));
		var zMat = new THREE.LineBasicMaterial({
			// color: 0x00ccff
			color: 0xff0000
		});
		var zAxis = new THREE.Line(zGeo, zMat);
		scene.add(zAxis);
	}

/***/ })
/******/ ]);