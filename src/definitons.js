import { capitalize } from "./utils"

function defHasSubKeyKeyParm(sub_config_key, key, parm) {
	return definitions[sub_config_key][key] !== undefined && definitions[sub_config_key][key][parm] !== undefined
}

export function generateKeysMapper(config, sub_config_key, key_filter) {
	return function (key) {
		if(key_filter!=="" && key.startsWith(key_filter)) return ;
		return {
			key,
			value: config[sub_config_key][key],

			name: defHasSubKeyKeyParm(sub_config_key,key,"name") ? definitions[sub_config_key][key].name : capitalize( key.replaceAll(key_filter,"").replaceAll("_", " ") ),

			type:  defHasSubKeyKeyParm(sub_config_key,key,"type") ? definitions[sub_config_key][key].type : (typeof config[sub_config_key][key]),
			enum:  defHasSubKeyKeyParm(sub_config_key,key,"enum") ? definitions[sub_config_key][key].enum : null,

			enabled_by: defHasSubKeyKeyParm(sub_config_key,key,"enabled_by") ? definitions[sub_config_key][key].enabled_by : [],
			enabled_by_config: config[sub_config_key],

			constraints: defHasSubKeyKeyParm(sub_config_key,key,"constraints") ? definitions[sub_config_key][key].constraints : {},

			comment:  defHasSubKeyKeyParm(sub_config_key,key,"unit") ? definitions[sub_config_key][key].unit : "",
		}
	}
}

export const definitions = {
    portal: {
		enabled: {
            type: "bool",
        },
		auth_enabled: {
            type: "bool",
        },
		auth_user: {
            type: "string",
			constraints: {
				length_min: 1,
			},
        },
		auth_password: {
            type: "password",
			constraints: {
				length_min: 1,
			},
        },
	},
	mqtt: {
		enabled: {
            type: "bool",
        },
		server: {
            type: "ipaddress",
			enabled_by: ["enabled"]
        },
		port: {
            type: "int",
			constraints: {
				min: 1,
				max: 320000,
			},
			enabled_by: ["enabled"]
        },
		id: {
            type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
        },
		user: {
            type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
        },
		password: {
            type: "password",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
        },
		topic_in: {
            type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
        },
		topic_out: {
            type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
        },
		topic_lwt: {
            type: "string",
			enabled_by: ["enabled","lwt_enabled"],
			constraints: {
				length_min: 1,
			},
        },
		lwt_enabled: {
            type: "bool",
			enabled_by: ["enabled"]
        },
	},
	wifi: {
		client_enabled: {
            type: "bool",
        },
		client_dhcp_enabled: {
            type: "bool",
			enabled_by: ["client_enabled"]
        },
		client_ssid: {
            type: "string",
			enabled_by: ["client_enabled"],
			constraints: {
				length_min: 1,
			},
        },
		client_password: {
            type: "string",
			enabled_by: ["client_enabled"],
			constraints: {
				length_min: 1,
			},
        },
		client_ip: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_mask: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_gateway: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_dns: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		ap_enabled: {
            type: "bool",
        },
		ap_ssid: {
            type: "string",
			enabled_by: ["ap_enabled"],
			constraints: {
				length_min: 1,
			},
        },
		ap_password: {
            type: "string",
			enabled_by: ["ap_enabled"],
			constraints: {
				length_min: 1,
			},
        },
		ap_ip: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"]
        },
		ap_network: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"]
        },
		ap_mask: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"]
        },
	},
	signal: {
		sample_rate: {
            type: "int",
			constraints: {
				min: 0,
				max: 256,
			},
        },
		min_raw_pulses: {
            type: "int",
			constraints: {
				min: 0,
				max: 291,
			},
        },
		seek_timeout: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "ms",
        },
		min_preamble: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "us",
        },
		min_pulse_len: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "us",
        },
		signal_end_timeout: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "us",
        },
		signal_repeat_time: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "ms",
        },
		scan_high_time: {
            type: "int",
			constraints: {
				min: 0,
			},
            unit: "ms",
        },
		async_mode_enabled: {
            type: "bool",
        },
	},
	radio: {
		hardware:{
            type: "stfringp",
            enum: ["generic", "rfm69"],
        },
		rx_data:  {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		rx_vcc: {
            type: "int",
			constraints: {
				min: 0,
			},
        },
		rx_nmos: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		rx_pmos: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		rx_gnd: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		rx_na: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		tx_data:{
            type: "int",
			constraints: {
				min: -1,
			},
        },
		tx_vcc: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		tx_nmos: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
		tx_pmos: {
            type: "int",
			constraints: {
				min: -1,
			},
        },
    }
  
}
