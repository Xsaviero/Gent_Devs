/*
 * Copyright 2003-2006, 2009, 2017, 2020 United States Government, as represented
 * by the Administrator of the National Aeronautics and Space Administration.
 * All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License
 * at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * NASAWorldWind/WebWorldWind also contains the following 3rd party Open Source
 * software:
 *
 *    ES6-Promise – under MIT License
 *    libtess.js – SGI Free Software License B
 *    Proj4 – under MIT License
 *    JSZip – under MIT License
 *
 * A complete listing of 3rd Party software notices and licenses included in
 * WebWorldWind can be found in the WebWorldWind 3rd-party notices and licenses
 * PDF found in code  directory.
 */
define(function () {
    "use strict";

    /**
     * Constructs an annotation controller for a specified {@link WorldWindow}.
     * @alias AnnotationController
     * @constructor
     * @classdesc Provides an annotation controller to interactively update DOM elements corresponding to a
     * specific annotation
     * @param {WorldWindow} worldWindow The WorldWindow to associate this annotation controller with. Used
     * mainly for redrawing the wwd globe after changing settings.
     */
    var AnnotationController = function (worldWindow) {

        var self = this;

        /**
         * The WorldWindow associated with this annotation controller.
         * @type {WorldWindow}
         */
        this.worldWindow = worldWindow;

        
        this.currentAnnotation = null;

        
        this.opacitySlider = $("#opacitySlider");
        this.scaleSlider = $("#scaleSlider");
        this.cornerSlider = $("#cornerSlider");
        this.leadWidthSlider = $("#leadWidthSlider");
        this.leadHeightSlider = $("#leadHeightSlider");
        this.backgroundR = $("#bgR");
        this.backgroundG = $("#bgG");
        this.backgroundB = $("#bgB");
        this.textR = $("#textR");
        this.textG = $("#textG");
        this.textB = $("#textB");

        
        this.spinnerLeft = $("#spinnerLeft");
        this.spinnerRight = $("#spinnerRight");
        this.spinnerTop = $("#spinnerTop");s
        this.spinnerBottom = $("#spinnerBottom");

        
        this.text = $("#annotationText");

     
        this.bgColorLabel = $("#bgColor");
        this.textColorLabel = $("#textColor");
        this.opacityLabel = $("#opacity");
        this.scaleLabel = $("#scale");
        this.cornerRadiusLabel = $("#cornerRadius");
        this.leaderGapLabel = $("#leadSize");

     
        this.text.on('input', function (e) {
            self.currentAnnotation.text = this.value;
            self.worldWindow.redraw();
        });

        this.opacitySlider.slider({
            value: 0,
            min: 0,
            max: 1,
            step: 0.1,
            animate: true,
            slide: function (event, ui) {
                $("#opacity").html(ui.value);
                self.currentAnnotation.attributes.opacity = ui.value;
            }
        });

        this.scaleSlider.slider({
            value: 1,
            min: 0.70,
            max: 2,
            step: 0.1,
            animate: true,
            slide: function (event, ui) {
                $("#scale").html(ui.value);
                self.currentAnnotation.attributes.scale = ui.value;
            }
        });

        this.cornerSlider.slider({
            value: 1,
            min: 0,
            max: 30,
            step: 1,
            animate: true,
            slide: function (event, ui) {
                $("#cornerRadius").html(ui.value);
                self.currentAnnotation.attributes.cornerRadius = ui.value;
            }
        });

        // Width value of the lead (arrow)
        this.leadWidthSlider.slider({
            //value: 40,
            min: 0,
            max: 70,
            step: 1,
            animate: true,
            slide: function (event, ui) {
                self.changeLeadSize(
                    self.leadWidthSlider.slider('value'),
                    self.leadHeightSlider.slider('value'));
            }
        });

        // Length value of the lead (arrow)
        this.leadHeightSlider.slider({
            //value: 30,
            min: 0,
            max: 100,
            animate: true,
            slide: function (event, ui) {
                self.changeLeadSize(
                    self.leadWidthSlider.slider('value'),
                    self.leadHeightSlider.slider('value'));
            }
        });

        // Red value of the background color
        this.backgroundR.slider({
            value: 0,
            min: 0,
            max: 255,
            step: 1,
            animate: true,
            slide: function (event, ui) {
                self.changeBackgroundColor(
                    self.backgroundR.slider('value'),
                    self.backgroundG.slider('value'),
                    self.backgroundB.slider('value'));
            }
        });

        // Green value of the background color
        this.backgroundG.slider({
            value: 0,
            min: 0,
            max: 255,
            animate: true,
            slide: function (event, ui) {
                self.changeBackgroundColor(
                    self.backgroundR.slider('value'),
                    self.backgroundG.slider('value'),
                    self.backgroundB.slider('value'));
            }
        });

        // Blue value of the background color
        this.backgroundB.slider({
            value: 0,
            min: 0,
            max: 255,
            animate: true,
            slide: function (event, ui) {
                self.changeBackgroundColor(
                    self.backgroundR.slider('value'),
                    self.backgroundG.slider('value'),
                    self.backgroundB.slider('value'));
            }
        });

        // Red value of the text color
        this.textR.slider({
            value: 0,
            min: 0,
            max: 255,
            animate: true,
            slide: function (event, ui) {
                self.changeTextColor(
                    self.textR.slider('value'),
                    self.textG.slider('value'),
                    self.textB.slider('value'));
            }
        });

        // Green value of the text color
        this.textG.slider({
            value: 0,
            min: 0,
            max: 255,
            animate: true,
            slide: function (event, ui) {
                self.changeTextColor(
                    self.textR.slider('value'),
                    self.textG.slider('value'),
                    self.textB.slider('value'));
            }
        });

        // Blue value of the text color
        this.textB.slider({
            value: 0,
            min: 0,
            max: 255,
            animate: true,
            slide: function (event, ui) {
                self.changeTextColor(
                    self.textR.slider('value'),
                    self.textG.slider('value'),
                    self.textB.slider('value'));
            }
        });

        // Left inset spinner
        this.spinnerLeft.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                var insets = self.currentAnnotation.attributes.insets.clone();
                insets.left = ui.value;
                self.currentAnnotation.attributes.insets = insets;
                self.worldWindow.redraw();
            }
        });

        // Right inset spinner
        this.spinnerRight.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                var insets = self.currentAnnotation.attributes.insets.clone();
                insets.right = ui.value;
                self.currentAnnotation.attributes.insets = insets;
                self.worldWindow.redraw();
            }
        });

        // Top inset spinner
        this.spinnerTop.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                var insets = self.currentAnnotation.attributes.insets.clone();
                insets.top = ui.value;
                self.currentAnnotation.attributes.insets = insets;
                self.worldWindow.redraw();
            }
        });

        // Bottom inset spinner
        this.spinnerBottom.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                var insets = self.currentAnnotation.attributes.insets.clone();
                insets.bottom = ui.value;
                self.currentAnnotation.attributes.insets = insets;
                self.worldWindow.redraw();
            }
        });
    };

    // Internal
    AnnotationController.prototype.changeTextColor = function(r, g, b) {
        this.textColorLabel.html("RGB(" + r + "," + g + "," + b + ")");
        this.currentAnnotation.attributes.textAttributes.color = WorldWind.Color.colorFromBytes(r, g, b, 255);
        this.worldWindow.redraw();
    };

    // Internal
    AnnotationController.prototype.changeBackgroundColor = function(r, g, b) {
        this.bgColorLabel.html("RGB(" + r + "," + g + "," + b + ")");
        this.currentAnnotation.attributes.backgroundColor = WorldWind.Color.colorFromBytes(r, g, b, 255);
        this.worldWindow.redraw();
    };

    // Internal
    AnnotationController.prototype.changeLeadSize = function(width, height){
        this.leaderGapLabel.html("width: " + width + " height: " + height);
        this.currentAnnotation.attributes.leaderGapWidth = width;
        this.currentAnnotation.attributes.leaderGapHeight = height;
        this.worldWindow.redraw();
    };

    /**
     * Loads an annotations and adjusts ui controls based on it's settings
     * @param annotation
     */
    AnnotationController.prototype.load = function (annotation) {

        this.currentAnnotation = annotation;

        var bgRed = annotation.attributes.backgroundColor.red * 255,
            bgGreen = annotation.attributes.backgroundColor.green * 255,
            bgBlue = annotation.attributes.backgroundColor.blue * 255,
            textRed = annotation.attributes.textAttributes.color.red * 255,
            textGreen = annotation.attributes.textAttributes.color.green * 255,
            textBlue = annotation.attributes.textAttributes.color.blue * 255,
            leadWidth = annotation.attributes.leaderGapWidth,
            leadHeight = annotation.attributes.leaderGapHeight;

        // Load background RGB sliders and format label based on values
        this.backgroundR.slider('value', bgRed);
        this.backgroundG.slider('value', bgGreen);
        this.backgroundB.slider('value', bgBlue);
        this.bgColorLabel.html("RGB(" + bgRed + "," + bgGreen + "," + bgBlue + ")");

        // Load text RGB sliders and format label based on values
        this.textR.slider('value', textRed);
        this.textG.slider('value', textGreen);
        this.textB.slider('value', textBlue);
        this.textColorLabel.html("RGB(" + textRed + "," + textGreen + "," + textBlue + ")");

        // Load leader size sliders and format label based on values
        this.leadWidthSlider.slider('value', leadWidth);
        this.leadHeightSlider.slider('value', leadHeight);
        this.leaderGapLabel.html("width: " + leadWidth + " height: " + leadHeight);

        // Load sliders settings and adjusts labels with their values
        this.opacitySlider.slider('value', annotation.attributes.opacity);
        this.scaleSlider.slider('value', annotation.attributes.scale);
        this.cornerSlider.slider('value', annotation.attributes.cornerRadius);
        this.opacityLabel.html(annotation.attributes.opacity);
        this.scaleLabel.html(annotation.attributes.scale);
        this.cornerRadiusLabel.html(annotation.attributes.cornerRadius);

        // Load insets values into the spinners
        this.spinnerBottom.val(annotation.attributes.insets.bottom);
        this.spinnerTop.val(annotation.attributes.insets.top);
        this.spinnerLeft.val(annotation.attributes.insets.left);
        this.spinnerRight.val(annotation.attributes.insets.right);

        //Load and display the text
        this.text.val(annotation.text);

    };

    return AnnotationController;
});