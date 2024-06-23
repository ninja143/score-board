<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Scorers List
                    <RouterLink to="/leaderboard/create-scorer" class="btn btn-primary float-end">
                        Add Scorer
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body ">
                <div class="row">
                    <div class="col-md-1 offset-md-3 float-end pd-0" style="width:6.33%">
                        Search : 
                    </div>
                    <div class="col-md-5">
                        <input 
                            type="text"
                            v-model.trim="inputSearch" 
                            v-model="search"
                            v-on:input="searchScorer()"
                            class="form-control mb-3"
                            placeholder="Search scorer(player) by name" />
                    </div>
                </div>
                <div id="" class="scrollable-table">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-active">
                                <th>
                                    <a href="#" @click="sortBy('name')" class="sort-btn" :class="sortKey =='name' ? 'active' : ''">
                                        Name
                                    </a>
                                </th>    
                                <th>Age</th>
                                <th>
                                    <a href="#" @click="sortBy('points')" class="sort-btn" :class="sortKey =='points' ? 'active' : ''">
                                        Points    
                                    </a>
                                </th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.scorers.length > 0">
                            <tr v-for="(scorer, index) in this.scorers" :key="index">
                                <td>{{ scorer.name }}</td>    
                                <td>{{ scorer.age }}</td>    
                                <td>
                                    <span>{{ scorer.points }}</span>
                                    <div class="btn-group-main float-end" role="toolbar" aria-label="Toolbar with button groups">
                                        <div class="btn-group me-2" role="group" aria-label="First group">
                                            <button type="button" @click="addPoint($event, scorer.id)" :data-point="scorer.points" class="btn btn-outline-secondary btn-sm fw-bolder" :disabled="!isAddCompleted">+</button>
                                            <button type="button" @click="deductPoint($event, scorer.id)" :data-point="scorer.points" class="btn btn-outline-secondary btn-sm fw-bolder" :disabled="!isAddCompleted">-</button>
                                        </div>
                                    </div>
                                </td>    
                                <td>{{ scorer.address }}</td>
                                <td>
                                    <!-- <RouterLink to="/student/create" class="btn btn-primary float-end">
                                        Delete
                                    </RouterLink> -->
                                    <button type="button" @click="deleteScorer(scorer.id)" class="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6">Loading...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'Scorers',
        data(){
            return {
                sortKey: 'points',
                revBy: true,
                scorers: [],
                inputScorer: '',
                isAddCompleted: true
            }
        },
        mounted(){
            this.getScorers()
        },
        methods: {
            getScorers() {
                let sortBy = this.sortKey || ''
                let revBy = this.revBy || ''
                let inputSearch = this.inputSearch || ''
                this.scorers.length = 0

                axios.get(`${__API_URL__}/player?sortBy=${sortBy}&revBy=${revBy}&search=${inputSearch}`).then(res =>{
                    this.scorers = res.data.data
                    // console.log(this.scorers)
                })
            },

            deleteScorer(pid){
                if(confirm('Are you sure, you want to delete this record ?')){

                    axios.delete(`${__API_URL__}/player/${pid}`).then(res =>{
                        if(res.status == 204) {
                            console.log('Player does not exit.')
                            this.getScorers()
                        }
                        if(res.status == 200) {
                            alert(res.data.data)
                            this.getScorers()
                        }
                    }).catch(function(error) {
                        if(res.status == 204) {
                            alert('Player does not exit.')
                            this.getScorers()
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                    })
                }
            },

            addPoint(e, pid) {
                this.isAddCompleted = false;
                e.target.dataset.point = parseInt(e.target.dataset.point) + 1
                axios.patch(`${__API_URL__}/player/${pid}`,
                    { "points": e.target.dataset.point },
                    { headers: { 'Content-Type': 'application/json'}}
                ).then((response) => {
                    console.log('pooits updated.')
                    this.getScorers()
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.isAddCompleted = true;
                });
            },
            
            deductPoint(e, pid) {
                this.isAddCompleted = false;
                if((parseInt(e.target.dataset.point) - 1) >= 0) {
                    e.target.dataset.point = parseInt(e.target.dataset.point) - 1;  
                    axios.patch(`${__API_URL__}/player/${pid}`,
                        { "points": e.target.dataset.point },
                        { headers: { 'Content-Type': 'application/json'}}
                    ).then((response) => {
                        console.log('pooits updated.')
                        this.getScorers()
                    }).catch((error) => {
                        console.log(error)
                    }).finally(() => {
                        this.isAddCompleted = true;
                    });
                } else {
                    this.isAddCompleted = true;
                    alert('Points can not not be less than 0')
                }
            },

            sortBy: function(sortKey) {
                if(this.sortKey == sortKey) {
                    this.revBy = this.revBy == false ? true : false
                } else {
                    this.revBy = true
                }
                this.sortKey = sortKey
                this.getScorers()
            },

            searchScorer() {
                this.scorers.length = 0
                this.getScorers()
            }
        }
    }
</script>
<style scoped>
    div.btn-group-main{
        display: inline-flex;
    }

    a.active {
        font-weight: bold;
        color: black;
    }
    div.scrollable-table{
        overflow-y:scroll;
        height:600px;
    }
</style>