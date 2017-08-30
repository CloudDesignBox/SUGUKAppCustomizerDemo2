import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'Sugukdemo2ApplicationCustomizerStrings';

import styles from './mystyles.module.scss';

//not recommended
//require('./badstyles.scss');

const LOG_SOURCE: string = 'Sugukdemo2ApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISugukdemo2ApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class Sugukdemo2ApplicationCustomizer
  extends BaseApplicationCustomizer<ISugukdemo2ApplicationCustomizerProperties> {
    
    private _headerPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Call render method for generating the needed html elements
    this._renderPlaceHolders();

    return Promise.resolve<void>();
  }

  private _renderPlaceHolders(): void {
    console.log('Available placeholders: ',
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    // Handling the top placeholder
    if (!this._headerPlaceholder) {
      this._headerPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { //on dispose method
          });
          this._headerPlaceholder.domElement.innerHTML = `
          <div class="${styles.myheader}">
            <img src="https://clouddesignboxlimited.sharepoint.com/sites/dev/SiteAssets/suguklogo.png" alt="SUGUK Logo" />
              <div class="${styles.socialmediaholder}">
              <div class="${styles.socialtileholder}"><a class="${styles.socialtile} ${styles.facebook}" href="https://www.facebook.com"></a></div>
              <div class="${styles.socialtileholder}"><a class="${styles.socialtile} ${styles.twitter}" href="https://www.twitter.com"></a></div>
              <div class="${styles.socialtileholder}"><a class="${styles.socialtile} ${styles.linkedin}" href="https://www.linkedin.com"></a></div>
              <div class="${styles.socialtileholder}"><a class="${styles.socialtile} ${styles.youtube}" href="https://www.youtube.com"></a></div>
              <div class="${styles.socialtileholder}"><a class="${styles.socialtile} ${styles.instagram}" href="https://www.instagram.com"></a></div>
            </div>
          </div>
          `;
    }

  }
}
// Team site demo
// https://clouddesignboxlimited.sharepoint.com/sites/team?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"8eb31960-228c-4575-819e-482c7a3f33ad":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"Hello as property!"}}}
// Communication site demo
// https://clouddesignboxlimited.sharepoint.com/sites/communication?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"8eb31960-228c-4575-819e-482c7a3f33ad":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"Hello as property!"}}}