import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select()
            .eq('user_id', userId)
            .single();
        if (error) {
            return { success: false, msg: error.message };
        }
        return { success: true, data };  // Return the data if no error
        
    } catch (e) {
        return { success: false, msg: e.message };  // Return correct error message
    }
    
}