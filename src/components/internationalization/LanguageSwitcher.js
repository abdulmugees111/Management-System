import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useToast } from "react-toastify";
import enImg from "../../assets/images/en.png";
import actions from "../../redux/user/actions";
import { change_language } from "../../services/internationalization/localization";
import switchStyles from './languageSwitcher.module.css'

function LanguageSwitcher({ dispatch }) {
  const { i18n } = useTranslation();


  const useChangeLanguage = () => {
    const queryClient = useQueryClient();

    queryClient.setMutationDefaults(["change-language"], {
      mutationFn: (data) => change_language(data),
      onMutate: async (variables) => {
        const { successCb, errorCb } = variables;
        return { successCb, errorCb };
      },
      onSuccess: (result, variables, context) => {
        if (context.successCb) {
          context.successCb(result);
        }
        console.log("Languiage chnaged")
         
      // window.location.reload()
      queryClient.invalidateQueries(()=>{
         dispatch({
            type: actions.LOAD_CURRENT_ACCOUNT
          });
      })
      },
      onError: (error, variables, context) => {
        if (context.errorCb) {
          context.errorCb(error);
        }
        console.log("Languiage chnaged Error")

      },
    });
    return useMutation(["change-language"]);
  };
  const changeLang = useChangeLanguage();

  const handleChange=(e)=>{
    i18n.changeLanguage(e.target.value)
    changeLang.mutate(e.target.value)
  

  }

  return (
    <div className={switchStyles.container}>
      <select className={switchStyles.select} value={i18n.language} onChange={handleChange}>
        <option className={switchStyles.option} value="en">
        🇬🇧&emsp;English
        </option>

        <option className={switchStyles.option} value="ar">🇸🇦&emsp;عربي</option>
      </select>
    </div>
  );
}


const mapStateToProps = ({ dispatch }) => ({
  dispatch: dispatch
});

export default withRouter(connect(mapStateToProps)(LanguageSwitcher));
