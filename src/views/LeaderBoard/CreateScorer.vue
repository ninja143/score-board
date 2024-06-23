<template>
    <div class="container" style="max-width: 60%;">
        <div class="card">
            <div class="card-header">
                <h4>Add Scorer</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">{{ error[0] }}</li>
                </ul>
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" v-model="model.scorer.name" name="name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="age">Age</label>
                    <input type="text" v-model="model.scorer.age" name="age" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" v-model="model.scorer.address" name="address" class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveScorer" class="btn btn-primary float-end">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    console.log(__API_URL__);
    export default {
        name: "createScorer",
        data(){
            return {
                errorList: {},
                model: {
                    scorer: {
                        name: '',
                        age: '',
                        address: ''
                    }
                }
            }
        },
        methods: {
            saveScorer(){
                var myThis = this
                axios.post(`${__API_URL__}/player`, this.model.scorer)
                .then(res => {
                    this.model.scorer = {
                        name: '',
                        age: '',
                        address: ''
                    }
                    this.errorList = ''
                    alert('New Scorer is added successfully.')
                }).catch(function (error) {
                    if (error.response) {
                        if(error.response.status == 422) {
                            myThis.errorList = error.response.data.errors
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log("Request: ", error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }           
                });
            }
        }
    }
</script>
