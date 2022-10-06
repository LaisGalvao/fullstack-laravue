<template>
  <div>
    <!-- toggle(btn), -->
    <div v-for="btn in buttons" :key="btn.id">
      <button
        @click="clicked(btn)"
        type="button"
        class="btn table-style btn-lg btn-block"
        :id="btn.childrenKey"
      >
        <div class="text-position" style="color: #708090">
          <div class="text-left">
            <span class="material-icons-outlined"> arrow_drop_down </span>
            {{ btn.key }}
          </div>
          <span class="text-right">{{ btn.value }}</span>
        </div>
      </button>

      <div v-if="btn.isActive">
        <b-table
          :items="items"
          :fields="fields"
          select-mode="single"
          @row-clicked="selected"
          selectable
          responsive
          hover
          borderless
          :busy="isBusy"
        >
          <template #table-busy>
            <div class="text-center text-dark my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(name)="{ item }">
            <div :style="item.value[0]" class="getCssAttr">
              {{ item.name }}
            </div>
          </template>
          <template v-slot:cell(value)="{ value, item, field: { key } }">
            <template
              v-if="edit != item.id && btn.childrenKey === 'style-text'"
            >
              <div :style="value[0]" class="getCssAttr">
                {{ value[0] | setAttr(value[0]) }}
              </div>
            </template>
            <div v-else>
              <quill-editor
                v-if="edit === item.id && btn.childrenKey === 'style-text'"
                @change="editor($event)"
                :options="editorOption"
                v-model="item[key][0]"
              />
            </div>
            <template>
              <div
                v-if="btn.childrenKey === 'color'"
                :style="value[0]"
                class="getCssAttr"
              >
                <verte
                  v-model="item[key][0]"
                  picker="square"
                  model="hex"
                ></verte>
              </div>
            </template>
            <!--  <b-form-input v-else v-model="item[key][0]" /> -->
          </template>

          <template
            v-if="btn.childrenKey === 'style-text'"
            #cell(actions)="{ item: { id }, item }"
          >
            <span
              class="btn-actions action btn-dark material-icons-outlined"
              @click="onSave(item, id)"
              v-if="edit === id"
            >
              save
            </span>
            <span
              class="btn-actions action btn-dark material-icons-outlined"
              @click="onEdit(id)"
              v-else
            >
              edit
            </span>
          </template>
        </b-table>
        <!--  -->
      </div>

      <div></div>
    </div>
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      size="md"
      align="right"
      class="my-0 customPagination"
    ></b-pagination>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Delta from 'quill-delta'
import { api } from '../../services'
import { toJSON } from 'cssjson'
import loja from '../../store/modules/loja'
import { toast } from '@/utils'
import Verte from 'verte'
import 'verte/dist/verte.css'

export default {
  components: {
    quillEditor,
    Verte
  },
  data () {
    return {
      isBusy: false,
      isActive: '',
      colors: [],
      newColors: [],
      edit: null,
      editItem: {},
      editColor: {},
      perPage: 5,
      currentPage: 1,
      items: [], // os itens da tabela ficam aqui (opcoes de texto e cores)
      // quillEdit: [], // os itens pegos pelo edit do quill ficam aqui
      extraFieldsStyle: [], // response dos estilos
      groupId: null, // group_id
      responseGroups: [], // response: grupos do qual o user faz parte
      gId: null, // group_id para os extra fields de texto e de cores

      values: null,
      typeValue: null,

      // as props que alimentam o rich editor
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean']
          ]
        }
      }
    }
  },

  filters: {
    setAttr (attr) {
      if (attr === undefined) {
        return ''
      }

      var json = toJSON(attr)

      // console.log(json)
      // console.log(attr)
      // console.log(json.attributes)

      if (json.attributes['font-weight'] === undefined) {
        var pos = attr.indexOf('font-weight') + 13
        var aux = attr.substring(pos, pos + 5)
        var weight = attr.substring(pos, pos + aux.indexOf(';'))

        pos = attr.indexOf('font-size') + 11
        aux = attr.substring(pos, pos + 5)
        var size = attr.substring(pos, pos + aux.indexOf(';'))
        return weight + ' ' + size
      }
      /*
      let json = toJSON(element.attributes.style.nodeValue)
      /*    let fontFamily = json.attributes['font-family'] */
      var fontWeight = json.attributes['font-weight']
      var fontSize = json.attributes['font-size']
      /*   fontFamily = 'Manrope' */
      json = ` ${fontWeight} ${fontSize}`
      // final.push(json)
      // console.log(json) // esta repetindo a mesma coisa
      return json
    }
  },
  computed: {
    buttons () {
      return this.$store.state.loja.btns
    },
    fields () {
      return this.$store.state.loja.fields
    }
  },
  methods: {
    toggle (btn) {
      // console.log(btn.isActive)
      btn.isActive = !btn.isActive
    },
    clicked (btn) {
      this.isBusy = true
      // console.log(btn)
      this.toggle(btn)

      this.typeValue = this.$store.getters.extraFields.map((a) =>
        a.map((v) => v.type_value)
      )
      // console.log(this.typeValue)
      this.values = this.$store.getters.extraFields.map((a) => a.map((v) => v))
      // console.log(this.values)

      /* para isso precisei percorrer de novo o typeValue pois ele retorna
      um array, claro que deve haver uma solução mais simples
      mas essa foi a que encontrei */
      this.typeValue.forEach((element) => {
        // type_value (color ou text)
        var filterValues = element.filter((v) => v.includes(btn.childrenKey))
        // values de estilo
        this.values.map((v) => {
          filterValues.forEach((element) => {
            /* comparo com o parametro v do values.map() */
            if (
              element === v.reduce((v) => v).type_value &&
              btn.isActive === true
            ) {
              this.items = v
            }
          })
        })
      })

      this.isBusy = false
      // console.log(this.items)
    },
    onEdit (id) {
      this.edit = this.edit !== id ? id : null
      console.log(this.edit)
    },
    editor (quill) {
      this.quillEdit = quill.quill.editor.delta.ops[0]
    },
    onSave (item, id) {
      console.log('onSave')
      console.log(this.edit)
      console.log(item)
      this.edit = this.edit !== item ? item : null
      console.log(this.edit)
      var form = item
      console.log(item.type_value)

      if (item.type_value === 'style-text') {
        form.value[0] = this.quillEdit.insert
      }
      console.log(form)

      // tratando se o quill retornar um HTML
      if (form.value[0].includes('<[^>]*>')) {
        form.value[0].replaceAll('<[^>]*>', '')
      }
      console.log(form.value[0])

      this.editItem = Object.assign(
        {},
        {
          [form.key]: form.value[0].includes('#')
            ? form.value[0]
            : [form.value[0]]
        }
      )

      console.log(this.editItem)

      var s = this.extraFieldsStyle.map((stl) => stl.key)
      console.log(s)
      var newForm = {
        [form.type_value === 'style-text' ? 'style_texts' : 'style_colors']:
          this.editItem
      }

      console.log('')

      console.log(newForm)
      /* this.$store.state.edit = newForm */
      this.$store.dispatch('edit', newForm)
      toast(
        this,
        'success',
        'Registro feito com sucesso, clique em "Salvar" para finalizar',
        item.name
      )
      /*
      for (var i = 0; i < this.colors.length; i++) {
        if (this.colors[i] !== this.newColors[i]) {
          this.editColors.push(Object.assign(
            {},
            {
              [this.newColors[i].key]: this.newColors[i].value[0]
            }
          ))
          console.log(this.editColors)

          const z = this.extraFieldsStyle.map((stl) => stl.key)
          console.log(z)
          var newFormColor = {
            style_colors: this.editColors
          }
          console.log(newFormColor)
          this.$store.dispatch('edit', newFormColor)
          toast(
            this,
            'success',
            'Registro feito com sucesso, clique em "Salvar" para finalizar'
          )
        }
      }
      */
    },

    selected (item) {
      console.log(item)
      var delta = new Delta()
      delta.ops = item.value
      console.log(this.colors[item.key])
      console.log(item.value)
      if (
        item.type_value !== 'style-text' &&
        item.value !== this.colors[item.key]
      ) {
        this.colorsNew[item.key] = item.value
        this.onSave(item, item.id)
      }
    }
  },
  beforeMount () {
    /* através da rota user/show, pego o retorno do(s) grupo(s) que um user faz parte
     e a partir disso puxo no group/public os campos extras de estilo
     usando como parâmetro o grupo que esse user atual faz parte */
    api
      .get(`${loja.state.get.urn}${this.$store.state.user.id}`)
      .then((response) => {
        var groups = response.data.user.groups
        var aux = 0
        for (var i = 0; i < groups.length; i++) {
          if (aux === 1) break
          if (groups[i].key === 'gold' || groups[i].key === 'nildo_adega') {
            this.gId = groups[i].id
            this.$store.dispatch('getGroupId', this.gId)
            console.log(groups[i].key)

            api.get(`${loja.state.get2.urn}=${this.gId}`).then((result) => {
              this.responseGroups = result.data.groups
              // console.log(this.responseGroups)
              var element
              // dentro dos grupos, com o grupo público que o user faz parte
              for (let r = 0; r < this.responseGroups.length; r++) {
                if (aux === 1) break
                if (this.responseGroups[r].id === this.gId) {
                  console.log(this.responseGroups[r].key + ' eh o grupo')
                  element = this.responseGroups[r]
                  break
                }
              }
              // console.log(element.extra_fields.length)

              // for (let k = 0; k < element.extra_fields.length; k++) {
              //  console.log(element.extra_fields[k].key)
              // }
              var exStyles = []
              for (let ext = 0; ext < element.extra_fields.length; ext++) {
                // console.log(ext)
                // console.log(element.extra_fields[ext].key)

                if (
                  element.extra_fields[ext].key === 'style_texts' ||
                  element.extra_fields[ext].key === 'style_colors'
                ) {
                  exStyles.push(element.extra_fields[ext])
                  this.groupId = element.extra_fields[ext].id

                  if (element.extra_fields[ext].key === 'style_colors') {
                    console.log(
                      element.extra_fields[ext].key + ' = style_colors'
                    )
                    var initColors = element.extra_fields[ext].children
                    for (let j = 0; j < initColors.length; j++) {
                      console.log(initColors[j].key)
                      var obj = {}
                      obj[initColors[j].key] = initColors[j].value
                      this.colors.push(obj)
                    }
                    console.log(this.colors)
                    this.colorsNew = this.colors
                  }
                }
                // console.log(element.extra_fields[ext].key + ' entrou')
                // console.log('ex de filho:')
                // console.log(element.extra_fields[ext].children[0]?.key)
                //    this.extraFieldsStyle = element.extra_fields[ext]

                console.log('exStyles:')
                console.log(exStyles)
                // this.extraFieldsStyle.shift()

                this.$store.dispatch(
                  'getExtraFields',
                  exStyles.map((a) => a.children)
                )
                aux = 1
              }
            })
          }
        }
      })
  }
}
</script>

<style src="./style.styl" lang="stylus"/>
