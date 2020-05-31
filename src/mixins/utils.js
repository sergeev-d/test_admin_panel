export const profileType = {
    methods:{
        isCustomer(profileType){
            return profileType === 2
        },
        isExpert(profileType){
            return profileType === 1
        }
    }
}
