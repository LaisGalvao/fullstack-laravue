export default {
    namespaced: true,
    state: {
      // Info
      btnLabel: 'Salvar',
      itemsKey: 'loja',
      title: 'Customizar Loja',
      /*    hasEdit: true, */
      name: 'Loja',
      keygGroup: 'test',
      // API Get index
      get: {
        urn: '',
        response: 'user'
      },
      get2: {
        urn: '',
        response: 'groups'
      },
      fields: [
        { key: 'name', label: '' },
        { key: 'value', label: '' },
        { key: 'actions', label: '' }
      ],
      btns: [
        {
          id: 'style_texts',
          childrenKey: 'style-text',
          key: 'Style Text',
          value: 'Estilo de fontes',
          isActive: false
        },
        {
          id: 'style_colors',
          childrenKey: 'color',
          key: 'Style Color',
          value: 'Estilo de cores',
          isActive: false
        }
      ]
    }
  }
  