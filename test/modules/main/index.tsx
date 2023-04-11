import { Module, customModule } from '@ijstech/components';
import Carousel from '@scom/scom-carousel';

@customModule
export default class Main extends Module {
  render() {
    return (
      <i-panel>
        <i-scom-carousel data={{
          autoplay: true,
          controls: true,
          indicators: true,
          swipe: true,
          data: [
            {
              title: 'Title',
              description: 'Description',
              imageUrl: 'https://images.unsplash.com/photo-1679759363308-f9e819e9f435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              link: 'https://images.unsplash.com/photo-1679759363308-f9e819e9f435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            },
            {
              title: 'Title 2',
              description: 'Description 2',
              imageUrl: 'https://images.unsplash.com/photo-1637592036032-0a16278cc590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              link: 'https://images.unsplash.com/photo-1637592036032-0a16278cc590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            },
            {
              title: 'Title 3',
              description: 'Description 3',
              imageUrl: 'https://images.unsplash.com/photo-1678931175840-7fad4b46a548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              link: 'https://images.unsplash.com/photo-1678931175840-7fad4b46a548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            }
          ]
        }}></i-scom-carousel>
      </i-panel>
    )
  }
}