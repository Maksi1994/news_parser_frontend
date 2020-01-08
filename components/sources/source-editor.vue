<template>
    <section class="py-5 px-2" >
      <b-form @submit="save" v-if="form">

       <b-form-group id="input-group-2" label=" Source Name:" label-for="input-2">
         <b-form-input
           id="input-2"
           :state="isValid('name')"
           v-model="form.name"
           required
           placeholder="Enter name"
         ></b-form-input>
       </b-form-group>

       <b-form-group id="input-group-2" label=" Source Domain:" label-for="input-2">
         <b-form-input
           id="input-2"
           :state="isValid('source')"
           v-model="form.source"
           required
           placeholder="Enter source domain"
         ></b-form-input>
       </b-form-group>

      <div class="d-flex">
        <b-form-checkbox
       v-model="form.show"
       value="1"
       unchecked-value="0">
          Show on Site
     </b-form-checkbox>

     <b-form-checkbox
        class="ml-5"
        v-model="form.active_parse"
        value="1"
        unchecked-value="0">
           Parce Source
      </b-form-checkbox>

      <b-form-checkbox
         class="ml-5"
         v-model="form.implemented"
         value="1"
         unchecked-value="0">
            Implemented
       </b-form-checkbox>
      </div>


       </div>

      <div class="w-25 mt-5">
         <label for="range-1">Parsing frequency</label>
         <b-form-input id="range-1" v-model="parsingFrequency" type="range" min="0" :max="parsingIntervals.length - 1"></b-form-input>
         <div class="mt-2">Value: Every {{ form.parse_interval }} min</div>
       </div>
     </b-form>

      <b-button class="ml-auto d-block" variant="success" @click="save">Save</b-button>
    </section>
</template>

<script>
    import {required, minLength, url} from 'vuelidate/lib/validators';
    import * as _ from 'lodash';

    export default {
        props: ['sourceData', 'highlightValidation'],
        data() {
            return {
                wasSubmitted: this.highlightValidation,
                form: this.sourceData ? _.pick(this.sourceData, [
                  'name',
                  'show',
                  'implemented',
                  'active_parse',
                  'source',
                  'parse_interval'
                ]) : {
                  name: null,
                  show: 0,
                  implemented: 0,
                  active_parse: 0,
                  source: null,
                  parse_interval: 1
                },
                parsingFrequency: null,
                parsingIntervals: [1, 15, 30]
            }
        },
        methods: {
            save() {
              this.wasSubmitted = true;

              if (!this.$v.$invalid) {
                  this.$emit('saveChanges', this.form);
              }
            },
            isValid(field) {
              const state =  !this.$v.form[field].$invalid;

              if (!this.wasSubmitted) {
                return null;
              }

              return state;
            }
        },
        watch: {
          parsingFrequency() {
            this.form.parse_interval = this.parsingIntervals[+this.parsingFrequency];
          }
        },
        created() {
          if (this.form.parse_interval) {
              this.parsingFrequency = this.parsingIntervals.indexOf(+this.form.parse_interval);
          } else {
            this.parsingFrequency = 0;
          }
        },
        validations: {
          form: {
            name: {
              required,
              minLength: minLength(3),
              async isUnique(value) {
                let success = true;

                if (!this.sourceData || value != this.sourceData.name) {
                    success = (await this.$axios.get('/backend/news-sources/is-unique-name/' + value)).data.success;
                }

                return success;
              },
            },
            source: {
              required,
              url
            }
          }
        }
    }
</script>

<style scoped>

</style>
