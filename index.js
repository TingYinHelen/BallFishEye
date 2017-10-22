// const scene = new THREE.Scene()
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// const container = document.getElementById('container')
// container.appendChild(renderer.domElement)

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 400)
// camera.position.set(0,0,-200)

// scene.add(camera)

// const cube = new THREE.SphereGeometry(50, 32, 32)
// const texture = new THREE.ImageUtils.loadTexture('static/textures/full_view.jpg', {}, ()=>{
// 	renderer.render(scene, camera)
// })
// const material = new THREE.MeshBasicMaterial({map: texture})
// console.log(material)
// const material = new THREE.MeshLambertMaterial({color: 0xffffff})
//
// const mesh = new THREE.Mesh(cube, material)
// mesh.scale.x = -1

// const light = new THREE.PointLight(0xff0000, 30, 400)
// const light = new THREE.AmbientLight(0xffffff)
// light.position.set(0, 0, -10)
// scene.add(light)

// mesh.position.set(0,0,50)
// scene.add(mesh)
// camera.lookAt(mesh.position)

// renderer.render(scene, camera)
// update()
// function update(){

// }






var camera, scene, renderer;
			var isUserInteracting = false
			onMouseDownMouseX = 0, onMouseDownMouseY = 0,
			lon = 90, onMouseDownLon = 0,
			lat = 0, onMouseDownLat = 0,
			phi = 0, theta = 0,
			onPointerDownPointerX = 0, onPointerDownPointerY = 0,
			onPointerDownLon = 0, onPointerDownLat = 0
var target = new THREE.Vector3();
// 			//lon是x的偏移(纬度)
// 			//lat是y的偏移(经度)
// 			//onPointerDownPointerX, onPointerDownPointerY是mousedown的时候的坐标
// 			// onPointerDownLon,onPointerDownLat 是mousedown的时候的经纬度

			init();
			animate();

			function init() {

				var container, mesh;
				container = document.getElementById( 'container' )
				renderer = new THREE.WebGLRenderer();
				// renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 110 );
				camera.position.set(0,0,0)
				scene = new THREE.Scene();
				scene.add(camera)

				const texture = new THREE.ImageUtils.loadTexture('static/textures/full_view.jpg', {}, ()=>{
					renderer.render(scene, camera)
				})
				texture.mapping = THREE.SphericalReflectionMapping

				const material = new THREE.MeshBasicMaterial({map: texture})

				// 0xff0000
				// material.color = new THREE.Color()

				mesh = new THREE.Mesh( new THREE.SphereGeometry(100, 32, 32), material );
				mesh.position.set(0,0,0)
				camera.lookAt(mesh.position)
				mesh.scale.x = -1;

				scene.add( mesh );
				renderer.render( scene, camera );
// 				var light = new THREE.AmbientLight(0xffffff);
// 				scene.add( light );




				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'wheel', onDocumentMouseWheel, false );

				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

// 				//

//         drawAxes(scene);
// 				// window.addEventListener( 'resize', onWindowResize, false );


			}

// 			// function onWindowResize() {

// 			// 	camera.aspect = window.innerWidth / window.innerHeight;
// 			// 	camera.updateProjectionMatrix();

// 			// 	renderer.setSize( window.innerWidth, window.innerHeight );

// 			// }

			function loadTexture( path ) {

        // var texture = new THREE.Texture( texture_placeholder );
        var texture = new THREE.ImageUtils.loadTexture(path)
        var material = new THREE.MeshBasicMaterial( { map: texture },()=>{
					renderer.render(scene, camera)
				} );

				return material;

			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

// 			// onPointerDownPointerX，onPointerDownPointerY  鼠标点击的位置
// 			// lon = 90, onMouseDownLon = 0,
// 			// lat = 0, onMouseDownLat = 0,
// 			// phi = 0, theta = 0,

			function onDocumentMouseMove( event ) {

				if ( isUserInteracting === true ) {

					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

				}
			}

			function onDocumentMouseUp( event ) {

				isUserInteracting = false;

			}

			function onDocumentMouseWheel( event ) {

				camera.fov += event.deltaY * 0.05;
				camera.updateProjectionMatrix();

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					onPointerDownPointerX = event.touches[ 0 ].pageX;
					onPointerDownPointerY = event.touches[ 0 ].pageY;

					onPointerDownLon = lon;
					onPointerDownLat = lat;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
					lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

				}

			}

			function animate() {
				requestAnimationFrame( animate );
				update();
			}

			function update(){

				if ( isUserInteracting === false ) {

					lon += 0.1;

				}

				// onMouseDownMouseX = 0, onMouseDownMouseY = 0,
				// lon = 90, onMouseDownLon = 0,
				// lat = 0, onMouseDownLat = 0,
				// phi = 0, theta = 0,

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				// target.x = 500 * Math.sin( phi ) * Math.cos( theta );
				// target.y = 500 * Math.cos( phi );
				// target.z = 500 * Math.sin( phi ) * Math.sin( theta );


				//lon经度  lat纬度
				//lat纬度， phi纬度的余角， theta经度
				target.x = 1 * Math.cos(theta)
				target.y = 1 * Math.cos(phi)
				target.z = 1 * Math.sin( theta )
        //将target的向量给camera，然后让camera反向
				// camera.position.copy( target ).negate();
        // camera.position.copy( target )
				camera.position.set(0, 0, 0)
				camera.lookAt( target )
				renderer.render( scene, camera );

      }

//       function drawAxes(scene) {
//         // x-axis
//         var xGeo = new THREE.Geometry();
//         xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
//         xGeo.vertices.push(new THREE.Vector3(3000, 0, 0));
//         var xMat = new THREE.LineBasicMaterial({
//             color: 0xff0000
//         });
//         var xAxis = new THREE.Line(xGeo, xMat);
//         scene.add(xAxis);

//         // y-axis
//         var yGeo = new THREE.Geometry();
//         yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
//         yGeo.vertices.push(new THREE.Vector3(0, 3000, 0));
//         var yMat = new THREE.LineBasicMaterial({
//             // color: 0x00ff00
//             color: 0xff0000
//         });
//         var yAxis = new THREE.Line(yGeo, yMat);
//         scene.add(yAxis);

//         // z-axis
//         var zGeo = new THREE.Geometry();
//         zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
//         zGeo.vertices.push(new THREE.Vector3(0, 0, 3000));
//         var zMat = new THREE.LineBasicMaterial({
//             // color: 0x00ccff
//             color: 0xff0000
//         });
//         var zAxis = new THREE.Line(zGeo, zMat);
//         scene.add(zAxis);
//     }