import Rails from '@rails/ujs';
import * as ActiveStorage from '@rails/activestorage';
import 'channels';
import 'material-design-lite/material.js';
import WebpackerReact from 'webpacker-react';
import TaskBoard from 'components/TaskBoard';

Rails.start();
ActiveStorage.start();

WebpackerReact.setup({ TaskBoard });
