using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;

namespace TrabajoIntento1
{
    public class SqlHelper
    {
        public enum enCnx
        {
            GameStore = 1
        }


        private static string ObtenerCnx(string stCnx)
        {
            return ConfigurationManager.ConnectionStrings[stCnx].ConnectionString;
        }

        public static string EjecutarProcedimiento(enCnx stConexion, string nameProcedure, params SqlParameter[] parameters)
        {
            SqlConnection Conex = new SqlConnection(ObtenerCnx(stConexion.ToString()));
            Conex.Open();
            SqlTransaction Tran = Conex.BeginTransaction();
            SqlCommand cmd = new SqlCommand();
            string rpta = string.Empty;

            try
            {
                SqlCommand block = cmd;
                block.Connection = Conex;
                block.Transaction = Tran;
                block.CommandText = nameProcedure;
                block.CommandType = CommandType.StoredProcedure;
                block.CommandTimeout = 0;

                AgregaParametros(ref cmd, ref parameters);

                object data = cmd.ExecuteScalar();
                if (data != null) rpta = data.ToString();

                Tran.Commit();

                return WebUtility.HtmlDecode(rpta);
            }
            catch (Exception ex)
            {
                Tran.Rollback();
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Conex.State == ConnectionState.Open)
                    Conex.Close();

                Conex = null;
                cmd = null;
                Tran = null;

                GC.Collect();
            }
        }

        public static DataSet EjecutarDataSet(enCnx stConexion, string NombreSP, params SqlParameter[] Parametros)
        {
            SqlConnection Conex = new SqlConnection(ObtenerCnx(stConexion.ToString()));
            Conex.Open();

            SqlTransaction Tran = Conex.BeginTransaction();

            SqlCommand Cmd = new SqlCommand();
            try
            {
                {
                    SqlCommand withBlock = Cmd;
                    withBlock.Connection = Conex;
                    withBlock.Transaction = Tran;
                    withBlock.CommandText = NombreSP;
                    withBlock.CommandType = CommandType.StoredProcedure;
                    withBlock.CommandTimeout = 0;
                }

                AgregaParametros(ref Cmd, ref Parametros);

                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = Cmd;

                DataSet ds = new DataSet();
                da.Fill(ds);

                Tran.Commit();

                return ds;
            }
            catch (Exception ex)
            {
                Tran.Rollback();
                throw new Exception(NombreSP.Replace(NombreSP, string.Empty) + ": " + ex.Message);
            }
            finally
            {
                if (Conex.State == ConnectionState.Open)
                    Conex.Close();

                Conex = null;
                GC.Collect();
            }
        }

        private static void AgregaParametros(ref SqlCommand Commando, ref SqlParameter[] Parametros)
        {
            if (Parametros.Length > 0 && Parametros != null)
            {
                foreach (SqlParameter Parametro in Parametros)
                    Commando.Parameters.Add(Parametro);
            }
        }
    }
}