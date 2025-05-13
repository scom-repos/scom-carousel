import { IUISchema } from "@ijstech/components";

const propertiesSchema: any = {
  type: 'object',
  properties: {
    autoplay: {
      type: 'boolean',
      title: 'autoplay?'
    },
    controls: {
      type: 'boolean',
      title: 'controls?'
    },
    indicators: {
      type: 'boolean',
      title: 'indicators?'
    },
    swipe: {
      type: 'boolean',
      title: 'swipe?'
    },
    data: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            required: true
          },
          description: {
            type: 'string'
          },
          imageCid: {
            title: 'Image',
            type: 'string',
            format: 'data-cid'
          },
          imageUrl: {
            type: 'string'
          },
          link: {
            type: 'string'
          }
        }
      }
    },
    titleFontColor: { 
      type: 'string',
      format: 'color',
    },
    descriptionFontColor: {
      type: 'string',
      format: 'color',
    },
  }
}

const UISchema: IUISchema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'General',
      elements: [
        {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Group',
                  label: 'Behaviour',
                  elements: [
                    {
                      type: 'HorizontalLayout',
                      elements: [
                        {
                          type: 'Control',
                          scope: '#/properties/autoplay',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/controls',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/indicators',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/swipe',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/data',
                  options: {
                    detail: {
                      type: 'VerticalLayout',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Category',
      label: 'Theme',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/titleFontColor',
        },
        {
          type: 'Control',
          scope: '#/properties/descriptionFontColor',
        },
      ],
    },
  ],
};

export { propertiesSchema, UISchema };