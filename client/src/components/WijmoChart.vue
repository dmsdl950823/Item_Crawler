<template>
  <wj-flex-grid
    :auto-generate-columns="false"
    :show-marquee="true"
    selection-mode="MultiRange"
    :initialized="flexGridInitialized"
    :items-source="data"
  >
    <!-- <wj-flex-grid-filter /> -->

    <!-- <wj-flex-grid-detail
      v-slot="ctx"
      :is-animated="true"
    >
      <b>Details:</b>
      <ul>
        <li>
          ID: <b>{{ ctx.item.id }}</b>
        </li>
        <li>
          Country: <b>{{ ctx.item.country }}</b>
        </li>
        <li>
          Date: <b>{{ ctx.item.date }}</b>
        </li>
        <li>
          Downloads: <b>{{ ctx.item.downloads }}</b>
        </li>
        <li>
          Sales: <b>{{ wjFormat(ctx.item.sales, "c2") }}</b>
        </li>
        <li>
          Active: <b>{{ ctx.item.active }}</b>
        </li>
      </ul>
    </wj-flex-grid-detail> -->

    <wj-flex-grid-column
      binding="id"
      header="ID"
    />
    <wj-flex-grid-column
      binding="country"
      header="Country"
    >
      <wj-flex-grid-cell-template
        v-slot="cell"
        cell-type="Cell"
      >
        <span
          :class="'flag-icon flag-icon-' + cell.item.country.toLowerCase()"
        />
        {{ cell.item.country }}
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
    <wj-flex-grid-column
      binding="date"
      header="Date"
    />
    <wj-flex-grid-column
      binding="downloads"
      header="Downloads"
    />
    <wj-flex-grid-column
      binding="sales"
      header="Sales"
      format="c2"
    />
    <wj-flex-grid-column
      binding="active"
      header="Active"
    />
  </wj-flex-grid>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo'
import { countries, getAppData } from './data'

export default {
  name: 'WijmoChart',
  data: function () {
    const appData = getAppData(100)
    return {
      countries,
      data: appData.data,
      chartData: appData.chartData,
      theNumberValue: 3.14,
      theDateTimeValue: new Date(),
      theComboBoxValue: countries[0],
      theAutoCompleteValue: countries[0],
      theFlexGrid: null
    }
  },
  methods: {
    dateTimeChanged: function (s) {
      this.theDateTimeValue = s.value
    },
    comboBoxChanged: function (s) {
      this.theComboBoxValue = s.text
    },
    autoCompleteChanged: function (s) {
      this.theAutoCompleteValue = s.text
    },
    flexGridInitialized: function (s) {
      this.theFlexGrid = s
    },
    wjFormat: function (value, format) {
      return wjcCore.Globalize.format(value, format)
    }
  }
}
</script>

<style>
.flexgrid-container {
width: 600px;
}

.wj-flexgrid {
height: 300px;
}

.flexchart-container {
min-width: 800px;
}

.flag-icon {
display: inline-block;
background-image: none;
background-repeat: no-repeat;
width: 16px;
height: 11px;
}

.flag-icon-canada {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAABoElEQVQoFQXBu24TQRQG4H92Z+31BWzZwUI0CCjgAQipU1PyBinTISFZosoL0FBwKRF1XgDxBkapLFG4IDIhRUSiLFnYmXNmzs/3ueb5C7u+LnwRLs5GqxUAAAAAkAQgIufzeQ8QIAHetmeD5UsA5c3VcDgkSVKaxhnK6W2aVb66c3jo+2PL+cfbNx7jGqD9vsxXFyRJJmP77r2FPHr9qnSOpGw2NpgW9+4K4JGM2agJKZGM6+/RpDzdQsLf1Tefc//ZLrouu5pREuBNBDlTlTGSbD989OOhG01Y1fnT55ufp4vjY+siXOckJsAjBNNkqiZKEo/u8+SE1di1oWjOy8dPzCzFrvADExWgSCEwKVUtBpLjg4N/8x1pGtW2nS0myyVJDYFRskgCvLUtVS1Gi9HMUNeTo6Pu6xfXr2d7e66uc86MMVcC1QT4dPmLqoxiIZgZSdersPu06NXo93POZmahs14sUhLAJ8Ciutm0yJ1zjiSA/mzHkQYUReGcqx48LKcL02SA2wAGJOAPcGu9DiGQBCAiJAGo6nZ/vwcYAOA/FrEy3Tu4pBoAAAAASUVORK5CYII=");
}

.flag-icon-germany {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAABNUlEQVQoz3WQMaoUARBEa2ZnwUgUEwN/aqjgNzJUzD5o6D1+4C28iLCXMNHUowgy3V3dVQazaOQLiqbgVdDL3d07zA4Jp61axbYICP9hI/f7+88AJEma6Zkj+wrZ090kebl83dZ1BfD9x88mj7qqKisr/xIRGfHh41sA2w3wSLohu7urmmQmM6uKEZWRmdwjK582AWyfmLczt6SrfGSmMxWpDGcqwnuq4szegM0sz6DKRWe4SlchnKlM7fvhm2VgM4Dpf8NVjlDEVdt3V06kqzwcYOMb4Ll9kkeixDkOt0W5MbQbov16iW/Y/AJ+Jj8eaaSxRtOWpD7erLElCX6y6D02FNzE+dWKWjRWLWqY1li02h677Ub1+hvL5cvLBwMVfELuEOCHWAMa1AlT0OC8QgGc8KvwBzggh2G9tgbIAAAAAElFTkSuQmCC");
}

.flag-icon-greece {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAABTklEQVQoz2WRP0sDQRDF311ONGLgCBEb01jpgV1EwUIQyWcR8TtYCxYW4qcQRAWLdEYFEcUUAUnEqIdICvEPBDXH7nsWe4kBYWZ4swxvfzvr5ZbOAVzshgBKq2+g951YJERCJCatPwY/RELIBACWS2EURZJW5m4h7W1OSxAACXIpSRQe4xcvjuNisSgJAABJ5zfvFCiRkkSmOjvin1aeAzfUnwZQu/u2pLGylsbKGBlLWuXDYGOn7g0vnpbn8wdbM5KW1+qkjrejlAIpirvJ9/1mMw5M0mN0DFR5vU5HQqUhURrLBrXqvdduvxYK4YDhoGA/Afm+32o9BfvVzsJs5qtL9ZzkvHswFJwYHcmcVTrByVV7ajL30UmslaWsZV/QtaSlLJXPDW0eNrzGw+d4flgS3PogSUgf+kcIkcLlddPDxFH6kV0C5l8QcOdw9RfrG2tQ02GPlgAAAABJRU5ErkJggg==");
}

.flag-icon-italy {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAA40lEQVQoz4WRTUoDYRBE38i38wQjBCSQc2TlLbLyDm7MKbxK7pETZGsuIBGGr6urXYyMv+ij6N7Ug4YeeIIJAIM435/9lZvNxrCkcWF/twdsuzyOYxVQtazdriJKqojL4dBoQD2/ntOZmR+9hdOpeq+IYbUyNIxd6ZRTGd/bVdX7LBBhaECSKsmSVT/5JAANIWdkKP8TJM9CWrK6u/IvYYgwXCGiomdXKrL/LkQglaT3k1KRMed3QYGSTKAxEdZ4PUaGlAAwDAML6zWZcwwDD/ACggkmjo9HSbbnCdxut/OPZ94ALlZ3hEs9N88AAAAASUVORK5CYII=");
}

.flag-icon-japan {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAABAklEQVQoz3WRMW4CMRBFx6utttgG0VBwDEoOQENBS4GUXAwlHeICFDSba1AgiESzSEhskbE1L4W9ZlPky7JnPH/0/9iu6zoZwMziPgwyglkpIlVViQgQeyBm/THA7XYrexKv4Hik+cIrsxmLRWY75ywq/GHv92y3hIB6mobvK2/vsSE6LLJ7QNqW3Q7vUU3r45PLJYuEEIo4XPbI45GoXlHl+eR8ppcws9LM+hwZjykKvKIeVbxHhMkkzQDJUuYzGrFc8qOJrcpqxXSaX0xEymwpdW42VBWHA6rM56zXeWIRCSG4tm3rus63KYg+nYNXRUROp1NpZvf7vf/IYMH+QxT5BSaTbJ+etTAQAAAAAElFTkSuQmCC");
}

.flag-icon-uk {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAB6ElEQVQoz2OYNHPfjqtvqqcfS2kGosOJjQdu3n27NrlxTUIdkOGZvc0jbYdtzIaoxp1zAvOr5x5lWLLi1P+Nq/79+3/74ZdFG27PX38HyP4/ped/XyuQMWnh5d65F06eePyvq+bf358TNl1gSGo5uOfku/9Ll/8/uPf///9t064Cyf+pmf8TEoF0Sd+lL4vWfO/uBrLnrbokaTIDpGHhhrt1E68+3Hf/T1P9fwiIifkfHgFi5Gb+f/Hiwp23jp7Li5qOCOpOZAA6FOQGNBAa+t/PD00MqOzMtZcMaxJr/0/u+J+S8j8+/n9k5P+QEJBSH59/rq6/7O1/Wlp+NzH5qqf3VVv7Z7Bbq7wVDhtsbf+YWUDMBeK/f//++fvn958/J6++YLCP29Qz53xU2o4rV9//f/vmZ3I8SJWRyW99Q7CGv0+dHPfP3CohPSskYT2DcDaDedi6xetBIfO5se5DV1dMyTEg+4+27i9NbaCrreyX/Pz//8usuS8SYpqmnmMQTGeYvPnyv39/v7dXHD1wu7DhYF7DYaAL/4Z4/A5y/vf3b3jattC41dsP3/r758frBN/soiUMVfMOTHFJds5cJKgzh0djMofqhPPXXrRKW7SIm5y+8pJBvJhBtIBBOFfEsK53z3VX0zwAPExoqi63l4YAAAAASUVORK5CYII=");
}

.flag-icon-us {
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAABs0lEQVQoz01R30tUURCes7lQEIE+WD7Y0ot/g1ZqGivVUw+BrhCIN+lBQ5BoH4QSNf8AEVwKWoKtHnwRcregUFl8ECwF5cIiLOWi2FIsq7vde+75Nc5d8eLwMfMNw3xnZg6znq5BYMaAUQACAMm/iXxH5/+/v38oNzVQjVHD2/m2VBZjnebjSqi/Hd9n2ePbKrlaN9ilEQHRIAXwSSaz4Dd0xlo/ZY02QBAKNfqEK/wJ41Aqw/ERVCvgOKz/fu7HGjWsdPS2993SPa9ZJi6j03XpF86d6Us2g9JLYc6svn7Udedte4tZQ9mO2M3kMr3gaysJHqINnnI21OEcCUO1ipyDEKHBh+v2JrOsr4nE3e5XZinOo1MX0/HjazPi95hpHtkuJdtO5WkH8uWrjXl/B+tLa1/03TdNwkbCDha1l4M9DQWtrsz42p5HIBIa7v2cz7FCId/UdF1KGSidJwF3XfdGGOYWU0xPPmP3HmF6GYtFKJdpYh+cI00vBAZEygvPBz7s/2K7uzuRSEslHL4seHD186aU5LwBYF9r0zA7wQ6ePKDjBB8JZ4QDVACcGmQtPa2eAMU6TEgictgDAAAAAElFTkSuQmCC");
}
</style>
