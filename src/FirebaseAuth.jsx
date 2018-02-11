/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @flow

import React from 'react';

// Global ID for the element.
const ELEMENT_ID = 'firebaseui_container';

/**
 * React Component wrapper for the FirebaseUI Auth widget.
 */
export default class FirebaseAuth extends React.Component {
  /**
   * Constructor  Firebase Auth UI component
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.uiConfig = props.uiConfig;
    this.firebaseAuth = props.firebaseAuth;
    this.className = props.className;
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');

    // Firebase UI only works on the Client. So we're loading in `componentDidMount`.
    const firebaseui = require('firebaseui');
    this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance()
                          || new firebaseui.auth.AuthUI(this.firebaseAuth);
    if (this.uiConfig.signInFlow === 'popup') {
      this.firebaseUiWidget.reset();
    }
    if (this.uiCallback) {
      this.uiCallback(this.firebaseUiWidget);
    }
    if (this.uiConfig.credentialHelper) {
      this.uiConfig.credentialHelper = firebaseui.auth.CredentialHelper[this.uiConfig.credentialHelper];
    }
    this.firebaseUiWidget.start('#' + this.elementId, this.uiConfig);
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.firebaseUiWidget.reset();
  }

  /**
   * Properties types.
   */
  props: {
    // The Firebase UI Web UI Config object.
    // See: https://github.com/firebase/firebaseui-web#configuration
    uiConfig: Object,
    // The Firebase App auth instance to use.
    firebaseAuth: Object,
    // Callback that will be passed the FirebaseUi instance before it is
    // started. This allows access to certain configuration options such as
    // disableAutoSignIn().
    uiCallback?: Function,
    className: String
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className={this.className} id={ELEMENT_ID}/>
    );
  }
}
