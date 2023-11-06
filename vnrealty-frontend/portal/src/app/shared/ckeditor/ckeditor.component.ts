import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as CustomEditor from '../../ckeditor/build/ckeditor';

import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { UploadAdapter } from './config/UploadAdapter';
import { NewsService} from 'app/services/news.service';

@Component({
  selector: 'app-ckeditor', 
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
})
export class CkeditorComponent implements OnInit {
  @Input() content: string;
  @Output() eventOnChange = new EventEmitter<any>(null);

  config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'imageUpload',
        'mediaEmbed',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        'alignment',
        '|',
        'insertTable',
        'indent',
        'outdent',
        'blockQuote',
        'undo',
        'redo',
        'exportWord',
        'fontSize',
        'fontFamily',
        'highlight',
        'fontColor',
        'horizontalLine',
        'specialCharacters',
        'todoList',
        'sourceEditing',
        'fontBackgroundColor',
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage',
      ],
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  };

  public Editor = CustomEditor;
  constructor(private service: NewsService) {}

  ngOnInit(): void {}

  onChange({ editor }: ChangeEvent) {
    if (editor) {
      const data = editor.getData();
      this.eventOnChange.emit(data);
    }
  }

  onReady(eventData) {
    const service = this.service;
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader, service);
    };
  }

  
}
